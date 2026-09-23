"""
Flowboard API
Collaborative Trello/Asana clone
Author: Owais Ahmed
Github: https://github.com/Owais-Ahmed-Siddiqui
"""

from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
import json
import uuid
import asyncio

# --- Config ---
SECRET_KEY = "flowboard-dev-secret-change-me-owais-ahmed"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer(auto_error=False)

app = FastAPI(title="Flowboard API", version="1.0.0",
              description="Collaborative project board API by Owais Ahmed - https://github.com/Owais-Ahmed-Siddiqui")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory DB (swap for SQLAlchemy easily) ---
db_users: Dict[str, dict] = {}
db_projects: Dict[str, dict] = {}
db_tasks: Dict[str, dict] = {}
db_comments: Dict[str, dict] = {}
db_posts: Dict[str, dict] = {}

def seed():
    if db_users: return
    users = [
      {"id":"u_owais","name":"Owais Ahmed","email":"owais@flowboard.dev","password":"demo123","avatar":"OA","role":"Founder & PM","color":"#6d5cf7"},
      {"id":"u_ayesha","name":"Ayesha Khan","email":"ayesha@flowboard.dev","password":"demo123","avatar":"AK","role":"Product Designer","color":"#ec6f6a"},
      {"id":"u_zain","name":"Zain Malik","email":"zain@flowboard.dev","password":"demo123","avatar":"ZM","role":"Frontend Engineer","color":"#22c55e"},
    ]
    for u in users:
        u["hashed"] = pwd_ctx.hash(u["password"])
        db_users[u["id"]] = u
    p_id = "p_flowboard"
    db_projects[p_id] = {"id":p_id,"name":"Flowboard Web","key":"FLOW","color":"#6d5cf7","description":"Main workspace","members":["u_owais","u_ayesha","u_zain"], "owner":"u_owais", "created_at": datetime.now(timezone.utc).isoformat()}
    for i, title in enumerate(["Real-time presence cursors","Drag & drop polish","Command palette (⌘K)"]):
        tid = f"t_{uuid.uuid4().hex[:7]}"
        db_tasks[tid] = {"id":tid, "project_id":p_id, "column":"todo" if i==2 else "progress", "title":title, "description":"", "assignees":["u_owais"], "priority":"medium", "created_at": datetime.now(timezone.utc).isoformat()}
seed()

# --- Auth helpers ---
def create_token(sub: str):
    exp = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": sub, "exp": exp}, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    if not creds: raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        uid = payload.get("sub")
        user = db_users.get(uid)
        if not user: raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- Schemas ---
class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class ProjectIn(BaseModel):
    name: str
    description: Optional[str] = ""

class TaskIn(BaseModel):
    project_id: str
    title: str
    description: Optional[str] = ""
    column: str = "todo"
    assignees: List[str] = []
    priority: str = "medium"
    due_date: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    column: Optional[str] = None
    assignees: Optional[List[str]] = None
    priority: Optional[str] = None

class CommentIn(BaseModel):
    body: str

class PostIn(BaseModel):
    body: str
    project_id: Optional[str] = None

# --- WebSocket manager ---
class ConnectionManager:
    def __init__(self):
        self.active: List[WebSocket] = []
    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)
    def disconnect(self, ws: WebSocket):
        if ws in self.active: self.active.remove(ws)
    async def broadcast(self, event: str, payload: dict):
        msg = json.dumps({"event": event, "payload": payload, "ts": datetime.now(timezone.utc).isoformat()})
        for ws in self.active[:]:
            try: await ws.send_text(msg)
            except: self.disconnect(ws)

manager = ConnectionManager()

# --- Routes ---
@app.get("/")
def root():
    return {
        "name": "Flowboard API",
        "author": "Owais Ahmed",
        "github": "https://github.com/Owais-Ahmed-Siddiqui",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.post("/api/auth/register")
def register(data: RegisterIn):
    if any(u["email"] == data.email for u in db_users.values()):
        raise HTTPException(400, "Email already registered")
    uid = "u_" + uuid.uuid4().hex[:6]
    user = {
        "id": uid, "name": data.name, "email": data.email,
        "hashed": pwd_ctx.hash(data.password),
        "avatar": "".join([p[0] for p in data.name.split()[:2]]).upper(),
        "role": "Member", "color": "#6d5cf7"
    }
    db_users[uid] = user
    token = create_token(uid)
    return {"access_token": token, "user": {k:v for k,v in user.items() if k != "hashed"}}

@app.post("/api/auth/login")
def login(data: LoginIn):
    user = next((u for u in db_users.values() if u["email"] == data.email), None)
    if not user or not pwd_ctx.verify(data.password, user["hashed"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user["id"])
    safe = {k:v for k,v in user.items() if k != "hashed"}
    return {"access_token": token, "user": safe}

@app.get("/api/me")
def me(user = Depends(get_current_user)):
    safe = {k:v for k,v in user.items() if k != "hashed"}
    return safe

@app.get("/api/users")
def list_users(user = Depends(get_current_user)):
    return [{k:v for k,v in u.items() if k != "hashed"} for u in db_users.values()]

# Projects
@app.get("/api/projects")
def list_projects(user = Depends(get_current_user)):
    return list(db_projects.values())

@app.post("/api/projects", status_code=201)
async def create_project(data: ProjectIn, user = Depends(get_current_user)):
    pid = "p_" + uuid.uuid4().hex[:6]
    key = "".join([w[0] for w in data.name.split()][:4]).upper()
    proj = {"id": pid, "name": data.name, "key": key or "PRJ", "color": "#6d5cf7",
            "description": data.description, "members": [user["id"]], "owner": user["id"],
            "created_at": datetime.now(timezone.utc).isoformat()}
    db_projects[pid] = proj
    await manager.broadcast("project.created", {"project": proj, "by": user["name"]})
    return proj

@app.get("/api/projects/{project_id}/tasks")
def project_tasks(project_id: str, user = Depends(get_current_user)):
    return [t for t in db_tasks.values() if t["project_id"] == project_id]

# Tasks
@app.post("/api/tasks", status_code=201)
async def create_task(data: TaskIn, user = Depends(get_current_user)):
    tid = "t_" + uuid.uuid4().hex[:7]
    task = data.model_dump()
    task.update({"id": tid, "created_at": datetime.now(timezone.utc).isoformat(), "created_by": user["id"]})
    db_tasks[tid] = task
    await manager.broadcast("task.created", {"task_id": tid, "title": task["title"], "by": user["name"]})
    return task

@app.patch("/api/tasks/{task_id}")
async def update_task(task_id: str, data: TaskUpdate, user = Depends(get_current_user)):
    task = db_tasks.get(task_id)
    if not task: raise HTTPException(404, "Task not found")
    patch = {k:v for k,v in data.model_dump().items() if v is not None}
    task.update(patch)
    await manager.broadcast("task.updated", {"task_id": task_id, "patch": patch, "by": user["name"]})
    return task

@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: str, user = Depends(get_current_user)):
    db_tasks.pop(task_id, None)
    return None

# Comments
@app.get("/api/tasks/{task_id}/comments")
def list_comments(task_id: str, user = Depends(get_current_user)):
    return [c for c in db_comments.values() if c["task_id"] == task_id]

@app.post("/api/tasks/{task_id}/comments", status_code=201)
async def add_comment(task_id: str, data: CommentIn, user = Depends(get_current_user)):
    if task_id not in db_tasks: raise HTTPException(404, "Task not found")
    cid = "cm_" + uuid.uuid4().hex[:7]
    comment = {"id": cid, "task_id": task_id, "user_id": user["id"], "body": data.body, "created_at": datetime.now(timezone.utc).isoformat()}
    db_comments[cid] = comment
    await manager.broadcast("comment.created", {"task_id": task_id, "comment": comment, "by": user["name"]})
    return comment

# Feed / Posts (social)
@app.get("/api/feed")
def get_feed(user = Depends(get_current_user)):
    posts = sorted(db_posts.values(), key=lambda x: x["created_at"], reverse=True)
    # seed some demo posts if empty
    if not posts:
        return [
            {"id":"fp_demo1","user_id":"u_owais","body":"Welcome to Flowboard! Post updates, cheer teammates.","created_at": datetime.now(timezone.utc).isoformat(), "likes":[]},
        ]
    return posts

@app.post("/api/feed", status_code=201)
async def create_post(data: PostIn, user = Depends(get_current_user)):
    pid = "fp_" + uuid.uuid4().hex[:7]
    post = {"id": pid, "user_id": user["id"], "body": data.body, "project_id": data.project_id,
            "created_at": datetime.now(timezone.utc).isoformat(), "likes": []}
    db_posts[pid] = post
    await manager.broadcast("feed.post", {"post": post, "by": user["name"]})
    return post

@app.post("/api/feed/{post_id}/like")
def toggle_like(post_id: str, user = Depends(get_current_user)):
    post = db_posts.get(post_id)
    if not post: raise HTTPException(404, "Not found")
    uid = user["id"]
    likes = post.setdefault("likes", [])
    if uid in likes: likes.remove(uid)
    else: likes.append(uid)
    return {"likes": likes}

# WebSocket - realtime
@app.websocket("/ws/feed")
async def websocket_feed(ws: WebSocket):
    await manager.connect(ws)
    try:
        await ws.send_text(json.dumps({"event": "hello", "payload": {"msg": "Connected to Flowboard RT - Owais Ahmed"}}))
        while True:
            # keep alive, also accept pings from client
            await ws.receive_text()
            await ws.send_text(json.dumps({"event": "pong"}))
    except WebSocketDisconnect:
        manager.disconnect(ws)

# Health
@app.get("/health")
def health():
    return {"ok": True, "users": len(db_users), "projects": len(db_projects), "tasks": len(db_tasks)}

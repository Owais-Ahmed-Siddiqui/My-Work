# Flowboard API (Python / FastAPI)

Collaborative Trello/Asana clone backend by **Owais Ahmed**  
https://github.com/Owais-Ahmed-Siddiqui

### Features
- JWT Auth (register / login)
- Projects / Boards
- Tasks with columns, assignees, priority
- Comments with @mentions
- Social Activity Feed / Posts
- Real-time WebSocket notifications `/ws/feed`
- CORS ready for the React frontend

### Quick start
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Demo users
Seeded on start:
- owais@flowboard.dev / demo123 (Owais Ahmed)
- ayesha@flowboard.dev / demo123
- zain@flowboard.dev / demo123

### WebSocket Example
```js
const ws = new WebSocket('ws://localhost:8000/ws/feed');
ws.onmessage = e => console.log(JSON.parse(e.data));
// events: task.created, task.updated, comment.created, feed.post
```

The React frontend (in `../src`) works fully offline with local mock data, and can be pointed at this API via a fetch client.

Made with ❤️ by Owais Ahmed

import streamlit as st
import os
import numpy as np
import pandas as pd
import plotly.express as px
import google.generativeai as genai
import requests
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from duckduckgo_search import DDGS
from streamlit_lottie import st_lottie

# --- CONFIGURATION ---
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

st.set_page_config(page_title="Cyber Business AI", page_icon="🌙", layout="wide")

# --- CUSTOM NEON DARK CSS ---
st.markdown("""
    <style>
    .stApp {
        background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0f1a 100%);
        color: #e0e0e0;
    }
    section[data-testid="stSidebar"] {
        background-color: rgba(15, 15, 26, 0.8) !important;
        border-right: 1px solid #4e4eeb;
    }
    .stChatMessage {
        background: rgba(255, 255, 255, 0.05) !important;
        backdrop-filter: blur(10px);
        border-radius: 20px !important;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 15px !important;
    }
    [data-testid="stChatMessageUser"] { border-left: 4px solid #00d4ff !important; }
    [data-testid="stChatMessageAssistant"] { border-left: 4px solid #7000ff !important; }
    
    .stButton>button {
        background: linear-gradient(45deg, #4e4eeb, #00d4ff);
        color: white; border: none; border-radius: 10px;
        font-weight: bold; width: 100%;
    }
    </style>
    """, unsafe_allow_html=True)

# --- ANIMATION LOADER (With Safety) ---
def get_lottie(url):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code != 200:
            return None
        return r.json()
    except Exception:
        return None

# Stable Lottie URLs
lottie_ai = get_lottie("https://lottie.host/808608d0-2f95-467b-9e47-49528d2207b7/Zq6X2n0F2S.json")
lottie_scanning = get_lottie("https://lottie.host/4a29a0f7-5847-414d-8e4a-579e0a050f22/uU7T6T6Y6E.json")

# --- LOGIC TOOLS ---

def process_pdfs(files):
    text = ""
    for f in files:
        pdf = PdfReader(f)
        for page in pdf.pages:
            text += page.extract_text() or ""
    chunks = [text[i:i+1000] for i in range(0, len(text), 800)]
    embs = genai.embed_content(model="models/embedding-001", content=chunks, task_type="retrieval_document")['embedding']
    return chunks, embs

def search_knowledge(query, chunks, embs):
    q_emb = genai.embed_content(model="models/embedding-001", content=query, task_type="retrieval_query")['embedding']
    scores = np.dot(embs, q_emb)
    return chunks[np.argmax(scores)]

def live_web_search(query):
    try:
        with DDGS() as ddgs:
            return "\n".join([r['body'] for r in ddgs.text(query, max_results=3)])
    except:
        return "Search error. Please try again."

# --- MAIN APP UI ---

def main():
    if not api_key:
        st.error("Missing GOOGLE_API_KEY in .env file!")
        return

    if "history" not in st.session_state:
        st.session_state.history = []
    if "data" not in st.session_state:
        st.session_state.data = {"chunks": None, "embs": None}

    # --- SIDEBAR ---
    with st.sidebar:
        # SAFETY CHECK: Only show if animation loaded
        if lottie_ai:
            st_lottie(lottie_ai, height=180, key="main_robot")
        
        st.title("💠 CYBER-ADMIN")
        
        with st.expander("📂 UPLOAD INTEL", expanded=True):
            pdfs = st.file_uploader("Company Reports", type="pdf", accept_multiple_files=True)
            if st.button("INITIALIZE SYSTEM"):
                if pdfs:
                    with st.spinner("Decoding Data..."):
                        c, e = process_pdfs(pdfs)
                        st.session_state.data["chunks"] = c
                        st.session_state.data["embs"] = e
                    st.toast("System Synced!", icon="✅")
                else:
                    st.error("No Data Sources Found.")

        st.divider()
        st.subheader("📉 MARKET DRIFT")
        df = pd.DataFrame({"Metric": ["Alpha", "Beta", "Gamma"], "Val": np.random.randint(20, 100, 3)})
        fig = px.line(df, x="Metric", y="Val", template="plotly_dark")
        fig.update_traces(line_color='#00d4ff', line_width=3)
        st.plotly_chart(fig, use_container_width=True)

    # --- MAIN CHAT AREA ---
    st.markdown("<h1 style='text-align: center; color: #00d4ff;'>SMART BUSINESS AI</h1>", unsafe_allow_html=True)

    # Display History
    for m in st.session_state.history:
        role = "assistant" if m["role"] == "model" else "user"
        with st.chat_message(role):
            st.write(m["parts"][0])

    # Input
    prompt = st.chat_input("Accessing Neural Database...")

    if prompt:
        with st.chat_message("user"):
            st.markdown(prompt)

        ctx = ""
        source = "Global Web"
        
        with st.status("📡 Processing Signal...", expanded=False) as s:
            if st.session_state.data["chunks"]:
                st.write("Extracting Private Context...")
                ctx = search_knowledge(prompt, st.session_state.data["chunks"], st.session_state.data["embs"])
                source = "Secure Vector DB"
            else:
                st.write("Retrieving Web Intelligence...")
                ctx = live_web_search(prompt)
                source = "DuckDuckGo Proxy"
            
            model = genai.GenerativeModel("gemini-3-flash-preview")
            full_p = f"Context: {ctx}\nUser: {prompt}\nInstruction: Act as a Senior Business Consultant. Be precise."
            
            chat = model.start_chat(history=st.session_state.history)
            response = chat.send_message(full_p)
            s.update(label="Signal Decoded", state="complete")

        with st.chat_message("assistant"):
            st.markdown(response.text)
            st.caption(f"SOURCE: {source} | SYSTEM: ONLINE")

        # Save to session
        st.session_state.history.append({"role": "user", "parts": [prompt]})
        st.session_state.history.append({"role": "model", "parts": [response.text]})

if __name__ == "__main__":
    main()
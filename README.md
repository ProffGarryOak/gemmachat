
### 🧠 GemmaChat — Local LLM Chatbot with Next.js, FastAPI & Ollama

> ✨ Your personal AI assistant, powered by Gemma 1B and running **fully offline**. Built with 💖 using **Next.js (App Router)** + **FastAPI** + **Ollama**.

---



---

### 🚀 Features

* 🤖 **Chat with Gemma 1B** — locally run LLM via Ollama
* 🌐 **Next.js App Router Frontend** — modern UI with Tailwind & React Markdown
* 🔐 **Secret Key Auth** — configurable `.env`-based API protection
* 💳 **Credit System** — limited usage with UI feedback and recharge prompts
* 📦 **Modular Backend** — FastAPI-based REST API for prompt generation
* 📄 **Markdown Support** — beautifully rendered LLM responses

---

### 🛠️ Tech Stack

| Layer       | Tech                                           |
| ----------- | ---------------------------------------------- |
| Frontend    | Next.js, React, Tailwind CSS, React Markdown   |
| Backend     | FastAPI (Python)                               |
| LLM Runtime | Ollama (Gemma 1B)                              |
| Styling     | Tailwind CSS                                   |
| Deployment  | Vercel (frontend), local for backend |

---

### 📦 Getting Started

#### 🧠 Requirements

* Node.js (v18+)
* Python 3.10+
* Ollama installed ([get it here](https://ollama.com))
* Docker (optional)
* Git

#### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/gemmachat.git
cd gemmachat
```

---

#### 2️⃣ Start the backend (FastAPI + Ollama)

> 🔥 Ensure Ollama is installed and running locally

```bash
# Pull the Gemma model (1B)
ollama pull gemma:1b

# Inside /backend/
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Create a .env file
echo SECRET_KEY=your-super-secret-key > .env

# Run FastAPI
uvicorn main:app --reload
```

---

#### 3️⃣ Start the frontend (Next.js)

```bash
# Inside /frontend/
cd frontend
npm install

# Create .env.local
echo NEXT_PUBLIC_SECRET_KEY=your-super-secret-key > .env.local
echo NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 > .env.local

# Run frontend
npm run dev
```

---

### 📷 Preview



---

### ⚙️ API Overview

| Method | Endpoint    | Params                | Description           |
| ------ | ----------- | --------------------- | --------------------- |
| GET    | `/generate` | `prompt`, `secretkey` | Generate LLM response |

---

### 💡 Deployment

#### ✅ Frontend

Deploy to **Vercel** or any static host:

```bash
# Vercel CLI (after login)
vercel --prod
```

#### ✅ Backend

You can run FastAPI locally or host it:

* Using **Docker**
* On **Render**, **Railway**, or a VPS
* Expose via **ngrok** for testing

---

### 🧠 Credit System Logic

* 🪙 Each prompt deducts 1 credit
* 🔐 If credits expire, UI prompts for recharge
* 📍 All logic handled client-side

---

### ✨ Inspiration

This project was built to explore **offline AI integration** with beautiful frontend UX. It’s a solid foundation for:

* Personal Assistants
* Educational bots
* Offline AI tools
* Experimental LLM-based interfaces

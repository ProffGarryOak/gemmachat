
# 🧠 GemmaChat — Personal AI Assistant with API Key & Credit-Based Access

**GemmaChat** is a personal AI assistant powered by **FastAPI** and **Ollama**, running the **Gemma 1B model** locally. It features a secure, scalable architecture with a **credit-based usage system**, ideal for monetized APIs or limited-access tools.

> Built for devs who want full control over AI prompt routing, session context, and user-level API access — without external cloud dependencies.

---

## 🚀 Features

- 🤖 Runs **Gemma 1B** locally using **Ollama** for fast LLM responses.
- 🔐 Secure **API key-based authentication** with environment variable config.
- 💳 Integrated **credit-based access control** — each API key has its own usage quota.
- 📊 Tracks usage per request and updates remaining credits in real-time.
- ⚠️ Sends **frontend usage alerts** when credits run low.
- 🔁 Includes **recharge routes and admin logic** to restore credits manually or programmatically.
- 🧩 Modular backend structure — easily extend to other models or features.

---

## 📁 Folder Structure


```
gemmachat/
├── _mygpt_backend_fastapi/ # FastAPI backend with Gemma integration
│ ├── pycache/
│ ├── main.py # FastAPI app entrypoint
│ └── requirements.txt # Python dependencies
│
├── mygptfe/ # Next.js frontend (GemmaChat UI)
│ ├── app/ # Page routing and layout
│ ├── components/ # Reusable React components
│ ├── lib/ # Utility libraries (API handlers, helpers)
│ ├── public/ # Static assets (icons, images)
│ ├── .gitignore
│ ├── README.md
│ ├── eslint.config.mjs
│ ├── jsconfig.json
│ ├── next.config.mjs
│ ├── package.json
│ ├── package-lock.json
│ └── postcss.config.mjs
│
├── gemmachat.code-workspace # VS Code workspace config
├── .gitignore
├── README.md
├── package.json
└── package-lock.json

```

---

## 🧪 Example API Flow

### 🔐 Authenticate (via API key)
Each request must include a valid API key in headers:
```

GET /chat
Headers:
x-api-key: YOUR\_SECRET\_KEY

```

### 🗨️ Chat with Gemma 1B
```

POST /chat
Body:
{
"prompt": "What's the capital of France?"
}

```
Returns AI-generated response from Gemma.

### 💳 Check Remaining Credits
```

GET /status
Headers:
x-api-key: YOUR\_SECRET\_KEY

````

---

## 🔧 Tech Stack

- 🚀 FastAPI (backend framework)
- 🧠 Ollama (Gemma 1B local model runtime)
- 🔑 API key management (custom with .env)
- 🧮 Credit tracking logic (in-memory / extendable to DB)
- 🔁 Optional frontend-compatible alerts and credit UI hooks

---

## 📦 Setup Instructions

1. **Install Ollama** and pull Gemma model:
   ```bash
   ollama pull gemma:1b
````

2. **Clone the repo & install dependencies**:

   ```bash
   git clone https://github.com/yourusername/gemmachat
   cd gemmachat
   pip install -r requirements.txt
   ```

3. **Configure your `.env`**:

   ```env
   API_KEYS=yourapikey1,yourapikey2
   INITIAL_CREDITS=20
   ```

4. **Run the app**:

   ```bash
   uvicorn app.main:app --reload
   ```

---

## 🧠 Use Cases

* Build your own **AI assistant dashboard**
* Create **usage-limited AI APIs** for clients or teammates
* Monetize AI tools with **credit packs**
* Run **offline LLMs locally**, fully self-hosted

---



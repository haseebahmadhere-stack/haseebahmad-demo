# HaseebAhmad-demo

This is my first Git Repository.

Author: Haseeb Ahmad

Superior University (GoldCampus)

---

## AI Chatbot

This project includes a simple AI-powered chatbot that uses the OpenAI API. It appears as a floating chat button on the bottom-right corner of the page.

### How to Set Up

1. **Get an OpenAI API Key**
   - Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Click **"Create new secret key"**
   - Copy the key (it starts with `sk-`)

2. **Add Your API Key**
   - Open `script.js`
   - Find this line near the top:
     ```js
     const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
     ```
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```js
     const OPENAI_API_KEY = "sk-your-actual-key-here";
     ```

3. **Open the Website**
   - Simply open `index.html` in your web browser
   - Click the 💬 button in the bottom-right corner to start chatting

### ⚠️ API Key Safety

> **Never commit your real API key to a public repository.**

Since this is a frontend-only project (no backend server), keep these tips in mind:

- **For local use only:** Add your key directly in `script.js` but do **not** push it to GitHub.
- **Use `.gitignore`:** Add `script.js` to your `.gitignore` file if you plan to keep your key in it, and keep a separate `script.example.js` as a template.
- **Environment variables (advanced):** For production use, you should set up a backend proxy server that holds your API key securely and forwards requests to OpenAI. This prevents your key from being exposed in the browser.
- **API key restrictions:** In your OpenAI dashboard, set usage limits to prevent unexpected charges.

### Project Structure

```
├── index.html    # Page structure and chatbot UI
├── style.css     # Styling and layout
├── script.js     # Chat logic and OpenAI API integration
└── README.md     # This file
```

### Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (Fetch API)
- OpenAI GPT-3.5 Turbo API

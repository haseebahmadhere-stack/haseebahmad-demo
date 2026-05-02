---
name: testing-chatbot
description: Test the AI chatbot UI end-to-end. Use when verifying chatbot toggle, messaging, API integration, or responsive layout changes.
---

# Testing the AI Chatbot

## Local Setup

1. Serve the static files with a local HTTP server:
   ```bash
   cd /path/to/repo && python3 -m http.server 8080
   ```
2. Open `http://localhost:8080/index.html` in Chrome.

## Key Test Flows

### Toggle & Chat Window
- Click the 💬 button at bottom-right to open the chat window.
- Verify header shows "AI Assistant" with ✕ close button.
- Verify toggle button hides when chat opens, reappears when chat closes.
- Messages should persist across close/reopen cycles.

### Messaging
- Type a message and click Send or press Enter.
- User messages appear right-aligned in dark bubbles.
- Bot responses appear left-aligned in light bubbles.
- A "Typing..." indicator appears briefly while waiting for API response.
- Empty messages (blank or whitespace-only) should be silently rejected.

### No API Key Fallback
- Without an API key configured, the bot responds with:
  "Please set your OpenAI API key in script.js to use this chatbot. See README.md for instructions."
- This is a non-error path (no exception thrown), so the message appears as a normal bot response.

### With API Key (if available)
- Set the `OPENAI_API_KEY` constant in `script.js` to a valid key.
- Send a message and verify the bot returns an AI-generated response.
- Verify conversation context is maintained across multiple messages.

### Error Handling
- If the API call fails, the user's message is removed from `conversationHistory` (via `.pop()`) to prevent context divergence.
- The error message "Sorry, something went wrong. Please try again." is displayed.
- Input field and Send button are re-enabled after errors.

### Responsive Layout
- Resize browser to ~375px width to test mobile layout.
- Chat window should expand to nearly full viewport width.
- Input field and Send button should remain accessible.

## Devin Secrets Needed
- `OPENAI_API_KEY` (optional) — needed only for testing real AI responses. Without it, the no-API-key fallback flow can still be tested.

## File Structure
- `index.html` — Chat UI structure (toggle button, chat window, input area)
- `style.css` — Styling with responsive breakpoints at 420px
- `script.js` — Chat logic, OpenAI API integration, error handling

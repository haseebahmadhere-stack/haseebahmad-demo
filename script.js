// ===================== Configuration =====================

// Replace this with your actual OpenAI API key.
// IMPORTANT: See README.md for instructions on how to handle
// your API key safely. Never commit real keys to a public repo.
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

// The OpenAI model to use for generating responses
const MODEL = "gpt-3.5-turbo";

// The API endpoint for OpenAI chat completions
const API_URL = "https://api.openai.com/v1/chat/completions";

// ===================== DOM Elements =====================

// Get references to all the elements we need
const toggleBtn = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const messagesContainer = document.getElementById("chatbot-messages");
const inputField = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

// ===================== Chat State =====================

// Keep track of the conversation history for context.
// The system message defines the chatbot's personality.
const conversationHistory = [
    {
        role: "system",
        content:
            "You are a helpful and friendly AI assistant on Haseeb Ahmad's portfolio website. " +
            "Keep your answers concise and helpful. If someone asks about Haseeb, " +
            "let them know they can reach out via the portfolio contact section.",
    },
];

// ===================== Toggle Chat Window =====================

/**
 * Opens the chat window and hides the toggle button.
 */
toggleBtn.addEventListener("click", function () {
    chatWindow.classList.remove("hidden");
    toggleBtn.style.display = "none";
    inputField.focus();
});

/**
 * Closes the chat window and shows the toggle button again.
 */
closeBtn.addEventListener("click", function () {
    chatWindow.classList.add("hidden");
    toggleBtn.style.display = "block";
});

// ===================== Send Message =====================

/**
 * Handles sending a message when the Send button is clicked.
 */
sendBtn.addEventListener("click", function () {
    handleSendMessage();
});

/**
 * Handles sending a message when the Enter key is pressed.
 */
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSendMessage();
    }
});

/**
 * Main function to handle sending a user message.
 * 1. Gets the user's text from the input field
 * 2. Displays the user's message in the chat
 * 3. Shows a "typing..." indicator
 * 4. Sends the message to OpenAI API
 * 5. Displays the AI response
 */
async function handleSendMessage() {
    // Get the text from the input field and trim whitespace
    const userText = inputField.value.trim();

    // Don't send empty messages
    if (!userText) return;

    // Clear the input field
    inputField.value = "";

    // Display the user's message in the chat window
    addMessage(userText, "user");

    // Add the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userText });

    // Show a typing indicator while waiting for the response
    const typingIndicator = addMessage("Typing...", "bot typing");

    // Disable the send button and input while waiting
    sendBtn.disabled = true;
    inputField.disabled = true;

    try {
        // Send the message to OpenAI and get the response
        const botResponse = await fetchOpenAIResponse();

        // Remove the typing indicator
        typingIndicator.remove();

        // Display the bot's response
        addMessage(botResponse, "bot");

        // Add the bot's response to the conversation history
        conversationHistory.push({ role: "assistant", content: botResponse });
    } catch (error) {
        // Remove the typing indicator
        typingIndicator.remove();

        // Show an error message to the user
        addMessage("Sorry, something went wrong. Please try again.", "bot");

        // Log the error for debugging
        console.error("OpenAI API Error:", error);
    } finally {
        // Re-enable the send button and input
        sendBtn.disabled = false;
        inputField.disabled = false;
        inputField.focus();
    }
}

// ===================== Display Messages =====================

/**
 * Adds a message bubble to the chat window.
 *
 * @param {string} text - The message text to display.
 * @param {string} className - CSS class(es) for styling ("user", "bot", or "bot typing").
 * @returns {HTMLElement} - The created message element (useful for removing typing indicator).
 */
function addMessage(text, className) {
    // Create a new div element for the message
    const messageDiv = document.createElement("div");

    // Add the base class and any additional classes (e.g., "user" or "bot typing")
    messageDiv.className = "chat-message " + className;

    // Set the text content of the message
    messageDiv.textContent = text;

    // Add the message to the messages container
    messagesContainer.appendChild(messageDiv);

    // Scroll to the bottom so the latest message is visible
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Return the element so we can remove it later (for typing indicator)
    return messageDiv;
}

// ===================== OpenAI API Call =====================

/**
 * Sends the conversation history to the OpenAI API and returns the response.
 *
 * This function uses the Fetch API to make a POST request to OpenAI's
 * chat completions endpoint. It sends the full conversation history
 * so the AI has context from previous messages.
 *
 * @returns {Promise<string>} - The AI's response text.
 * @throws {Error} - If the API request fails.
 */
async function fetchOpenAIResponse() {
    // Check if the API key has been set
    if (OPENAI_API_KEY === "YOUR_API_KEY_HERE") {
        return "Please set your OpenAI API key in script.js to use this chatbot. See README.md for instructions.";
    }

    // Make the API request
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: conversationHistory,
            max_tokens: 300,
            temperature: 0.7,
        }),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
        const errorData = await response.json().catch(function () {
            return {};
        });
        throw new Error(
            "API request failed: " +
                response.status +
                " " +
                (errorData.error ? errorData.error.message : response.statusText)
        );
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract and return the assistant's message text
    return data.choices[0].message.content.trim();
}

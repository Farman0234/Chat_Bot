const API_KEY = "AIzaSyCwzQwPUKZ09Ll1tKI299QOvKoMpVzJFQQ"; // ⚠ Replace with your real API key

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");
  const input = inputField.value.trim();

  if (input === "") return;

  chatBox.innerHTML += `<div class="message user"><b>You 🤵:</b> ${input}<div class="time">${getTime()}</div></div>`;
  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const prompt = `You are a helpful and friendly programming assistant. 
You can also respond politely to greetings like "hello", "hi", or "how are you", 
but avoid answering unrelated questions. Question: ${input}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 Sorry, no reply from Gemini.";

    chatBox.innerHTML += `<div class="message bot"><b>Bot 🤖:</b> ${reply}<div class="time">${getTime()}</div></div>`;
  } catch (error) {
    chatBox.innerHTML += `<div class="message bot error"><b>Bot 🤖:</b> Error: ${
      error.message
    }<div class="time">${getTime()}</div></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

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

  chatBox.innerHTML += `<pre class="message user"><pre>You 🤵:</pre> ${input}<div class="time">${getTime()}</div></pre>`;
  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const loadingId = `loading-${Date.now()}`;
  chatBox.innerHTML += `<pre id="${loadingId}" class="message bot loading"><pre>Bot 🤖:</pre> Typing...<div class="time">${getTime()}</div></pre>`;
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
      "🤖 Sorry, no reply from Chat Bot.";

    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.classList.remove("loading");
      loadingElement.innerHTML = `<pre>Bot 🤖:</pre> ${reply}<div class="time">${getTime()}</div>`;
    }
  } catch (error) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.classList.remove("loading");
      loadingElement.classList.add("error");
      loadingElement.innerHTML = `<pre>Bot 🤖:</pre> Error: ${
        error.message
      }<div class="time">${getTime()}</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

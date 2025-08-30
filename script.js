import { GoogleGenAI } from "https://esm.run/@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDGOEA2AtjXUCKmO45RLr3t535438aFFsk" // ⚠️ inseguro en frontend
});

const messagesContainer = document.getElementById("messages");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "ai-msg";
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.getElementById("enviar").addEventListener("click", async () => {
  const pregunta = document.getElementById("prompt").value;
  if (!pregunta) return;

  addMessage(pregunta, "user");
  document.getElementById("prompt").value = "";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: pregunta,
  });

  addMessage(response.text, "ai");
});

// 🌙/☀️ Botón de cambio de tema
const toggleBtn = document.getElementById("toggle-mode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent = document.body.classList.contains("light-mode")
    ? "☀️ Modo Claro"
    : "🌙 Modo Oscuro";
});

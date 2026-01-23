function addMessage(text, sender) {
  const chatContainer = document.getElementById("chat-container");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  msgDiv.innerText = text;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // auto-scroll
}

document.getElementById("ask-btn").addEventListener("click", async () => {
  const query = document.getElementById("query").value;
  if (!query) return;

  addMessage(query, "user");

  const res = await fetch(`http://127.0.0.1:8000/chat?query=${encodeURIComponent(query)}`);
  const data = await res.json();

  addMessage(data.response, "bot");
});

const API_BASE = "https://public-scheme-navigator.vercel.app";
// For local testing, switch to: const API_BASE = "http://127.0.0.1:8000";

document.getElementById("guidance-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const scheme = document.getElementById("scheme").value;

  try {
    const res = await fetch(`${API_BASE}/guidance?scheme=${encodeURIComponent(scheme)}`);
    const data = await res.json();

    const resultsDiv = document.getElementById("guidance-results");
    resultsDiv.innerHTML = `<h3>Required Documents for ${data.scheme}</h3><ul>` +
      data.documents.map(doc => `<li>${doc}</li>`).join("") +
      `</ul>`;
  } catch {
    document.getElementById("guidance-results").innerText =
      "⚠️ Error fetching guidance from backend.";
  }
});

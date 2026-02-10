document.getElementById("guidance-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const scheme = document.getElementById("scheme").value;

  try {
    const res = await fetch(`http://127.0.0.1:8000/guidance?scheme=${encodeURIComponent(scheme)}`);
    const data = await res.json();

    const resultsDiv = document.getElementById("guidance-results");
    resultsDiv.innerHTML = `<h3>Required Documents for ${data.scheme}</h3><ul>` +
      data.documents.map(doc => `<li>${doc}</li>`).join("") +
      `</ul>`;
  } catch {
    document.getElementById("guidance-results").innerText =
      "⚠️ Error fetching guidance. Is the backend running on port 8000?";
  }
});

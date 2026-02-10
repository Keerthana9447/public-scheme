document.getElementById("eligibility-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const age = document.getElementById("age").value.trim();
  const income = document.getElementById("income").value.trim();
  const gender = document.getElementById("gender").value;
  const occupation = document.getElementById("occupation").value.trim();
  const scheme = document.getElementById("scheme").value;
  const disability = document.getElementById("disability").checked;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerText = "⏳ Checking eligibility...";

  try {
    const url = new URL("http://127.0.0.1:8000/eligibility");
    url.searchParams.append("age", age);
    url.searchParams.append("income", income);
    if (gender) url.searchParams.append("gender", gender);
    if (occupation) url.searchParams.append("occupation", occupation);
    if (disability) url.searchParams.append("disability", "true");

    const res = await fetch(url);
    const data = await res.json();

    if (data.eligible_schemes.includes(scheme)) {
      resultsDiv.innerHTML = `<p>✅ You are eligible for:</p>
        <div class="badge-container"><span class="badge eligible">${scheme}</span></div>`;
    } else {
      resultsDiv.innerHTML = `<p>❌ You are not eligible for:</p>
        <div class="badge-container"><span class="badge not-eligible">${scheme}</span></div>`;
    }
  } catch {
    resultsDiv.innerText = "⚠️ Error fetching eligibility. Is the backend running on port 8000?";
  }
});

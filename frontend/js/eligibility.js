const API_BASE = "https://public-scheme-navigator.vercel.app";
// For local testing, switch to: const API_BASE = "http://127.0.0.1:8000";
import { API_BASE } from "./config.js";

// Example fetch call
async function checkEligibility(age, income, gender, occupation, scheme, disability) {
  const response = await fetch(`${API_BASE}/eligibility?age=${age}&income=${income}&gender=${gender}&occupation=${occupation}&scheme=${scheme}&disability=${disability}`);
  const data = await response.json();
  return data;
}

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
    const url = new URL(`${API_BASE}/eligibility`);
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
    resultsDiv.innerText = "⚠️ Error fetching eligibility from backend.";
  }
});

document.getElementById("eligibility-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value;
  const gender = document.getElementById("gender").value;
  const occupation = document.getElementById("occupation").value;
  const disability = document.getElementById("disability").checked;

  try {
    const res = await fetch(`http://127.0.0.1:8000/eligibility?age=${age}&income=${income}&gender=${gender}&occupation=${occupation}&disability=${disability}`);
    const data = await res.json();

    let resultHTML = `<p>${data.message}</p>`;

    if (data.eligible_schemes && data.eligible_schemes.length > 0) {
      resultHTML += `<div class="badge-container">`;
      data.eligible_schemes.forEach(scheme => {
        resultHTML += `<span class="badge eligible">${scheme}</span>`;
      });
      resultHTML += `</div>`;
    } else {
      resultHTML += `<span class="badge not-eligible">No services available</span>`;
    }

    document.getElementById("results").innerHTML = resultHTML;
  } catch (err) {
    document.getElementById("results").innerText = "⚠️ Error fetching eligibility. Is the backend running?";
    console.error(err);
  }
});

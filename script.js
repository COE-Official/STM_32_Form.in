document.getElementById("enquiryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const data = {
    fullName: document.getElementById("fullName").value,
    rollNo: document.getElementById("rollNo").value,
    branch: document.getElementById("branch").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    year: document.getElementById("year").value,
    division: document.getElementById("division").value,
    cgpa: document.getElementById("cgpa").value,
    skills: document.getElementById("skills").value,
    why_attend: document.getElementById("why_attend").value,
    questions: document.getElementById("questions").value
  };

  // Phone validation
  if (data.phone.length !== 10) {
    alert("Phone number must be exactly 10 digits.");
    resetButton(submitBtn);
    return;
  }

  if (data.cgpa < 0 || data.cgpa > 10) {
    alert("CGPA must be between 0 and 10.");
    resetButton(submitBtn);
    return;
  }

  if (!(data.email.endsWith("@gmail.com") || data.email.endsWith("@tcetmumbai.in"))) {
    alert("Email must be a @gmail.com or @tcetmumbai.in address.");
    resetButton(submitBtn);
    return;
  }

  // Consent checkbox
  if (!document.getElementById("consent").checked) {
    alert("Please check the confirmation box to proceed.");
    resetButton(submitBtn);
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzQ89LG3EWspG6Bkh1eu8E13P44BfGdWch_Rqrhbpak94U_IfXmfQG2ETCLiI5x4GiG/exec/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    document.getElementById("enquiryForm").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    resetButton(submitBtn);
    document.getElementById("enquiryForm").reset();
  })
  .catch(err => {
    alert("Error: " + err);
    resetButton(submitBtn);
  });
});

function resetButton(btn) {
  btn.disabled = false;
  btn.textContent = "Submit";
}

document.getElementById("newResponseBtn").addEventListener("click", function () {
  document.getElementById("enquiryForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
});

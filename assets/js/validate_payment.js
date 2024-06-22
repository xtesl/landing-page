document.addEventListener("DOMContentLoaded", function() {
    const validateButton = document.getElementById("validateButton");
    const userIDInput = document.getElementById("userID");
    const courseInput = document.getElementById("course");
    const amountInput = document.getElementById("amount");
    const resultDiv = document.getElementById("result");
  
    validateButton.addEventListener("click", function() {
      const userID = userIDInput.value.trim();
      const course = courseInput.value.trim();
      const amount = parseFloat(amountInput.value.trim());
  
      // Validation logic (replace this with your actual validation)
      if (userID && course && !isNaN(amount) && amount > 0) {
        resultDiv.textContent = "Payment is validated!";
        resultDiv.style.color = "green";
      } else {
        resultDiv.textContent = "Invalid input!";
        resultDiv.style.color = "red";
      }
    });
  });
  
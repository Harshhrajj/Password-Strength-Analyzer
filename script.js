const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const feedback = document.getElementById("feedback");

const ctx = document.getElementById("chart").getContext("2d");
const chartData = {
  labels: ["Lowercase", "Uppercase", "Numbers", "Special Characters"],
  datasets: [
    {
      label: "Password Composition",
      data: [0, 0, 0, 0],
      backgroundColor: ["#f39c12", "#3498db", "#2ecc71", "#9b59b6"],
      borderWidth: 1,
    },
  ],
};

const chart = new Chart(ctx, {
  type: "doughnut",
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = calculateStrength(password);
  updateStrengthMeter(strength);
  updateFeedback(strength);
  updateChart(password);
});

function calculateStrength(password) {
  let strength = 0;

  // Check length
  if (password.length >= 8) strength++;

  // Check for lowercase, uppercase, and numbers
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;

  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return strength;
}

function updateStrengthMeter(strength) {
  const colors = ["red", "orange", "yellow", "lightgreen", "green"];
  strengthBar.style.width = `${(strength / 5) * 100}%`;
  strengthBar.style.backgroundColor = colors[strength];
}

function updateFeedback(strength) {
  const messages = [
    "Very Weak - Add more characters and variety.",
    "Weak - Add uppercase, numbers, or special characters.",
    "Moderate - You can do better!",
    "Strong - Good job!",
    "Very Strong - Excellent password!",
  ];
  feedback.textContent = messages[strength];
}

function updateChart(password) {
  const lowercase = (password.match(/[a-z]/g) || []).length;
  const uppercase = (password.match(/[A-Z]/g) || []).length;
  const numbers = (password.match(/[0-9]/g) || []).length;
  const specialChars = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  chart.data.datasets[0].data = [lowercase, uppercase, numbers, specialChars];
  chart.update();
}

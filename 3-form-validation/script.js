/**
 * Account Registration Form Validation
 * Crafted by Omkar Kumbhar
 * Real-time regex validators, strength calculation, and clean UX feedback
 */

const validationRules = {
  name(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Full name is required.";
    if (trimmed.length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z][A-Za-z .'-]*$/.test(trimmed)) return "Name can only contain alphabetical characters.";
    return "";
  },

  email(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Email address is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(trimmed)) return "Please enter a valid email address.";
    return "";
  },

  phone(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Phone number is required.";
    if (!/^\d+$/.test(trimmed)) return "Digits only, without spaces or symbols.";
    if (trimmed.length !== 10) return "Phone number must be exactly 10 digits.";
    return "";
  },

  password(val) {
    if (!val) return "Password cannot be empty.";
    if (val.length < 8) return "Password must be at least 8 characters long.";
    if (!/[a-z]/.test(val) || !/[A-Z]/.test(val)) return "Include both uppercase and lowercase letters.";
    if (!/\d/.test(val)) return "Include at least one numerical digit.";
    return "";
  }
};

const monitoredFields = ["name", "email", "phone", "password"];

function validateField(fieldKey) {
  const inputEl = document.getElementById(fieldKey);
  const msgEl = document.getElementById(`${fieldKey}-msg`);
  const errorText = validationRules[fieldKey](inputEl.value);

  msgEl.textContent = errorText;

  const isInvalid = errorText !== "";
  const isValid = errorText === "" && inputEl.value.trim() !== "";

  inputEl.classList.toggle("is-invalid", isInvalid);
  inputEl.classList.toggle("is-valid", isValid);

  return !isInvalid;
}

// Wire up dynamic blur and typing listeners
monitoredFields.forEach((fieldKey) => {
  const inputEl = document.getElementById(fieldKey);

  inputEl.addEventListener("blur", () => {
    validateField(fieldKey);
  });

  inputEl.addEventListener("input", () => {
    if (inputEl.classList.contains("is-invalid")) {
      validateField(fieldKey);
    }
  });
});

// Password strength indicator
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");

passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;
  let score = 0;

  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const palette = ["transparent", "#f87171", "#fbbf24", "#34d399", "#10b981"];
  strengthBar.style.width = `${score * 25}%`;
  strengthBar.style.background = palette[score];
});

// Toggle password visibility
const toggleBtn = document.getElementById("togglePw");
toggleBtn.addEventListener("click", () => {
  const isCurrentlyHidden = passwordInput.type === "password";
  passwordInput.type = isCurrentlyHidden ? "text" : "password";
  toggleBtn.textContent = isCurrentlyHidden ? "Hide" : "Show";
});

// Submission handler
const formEl = document.getElementById("signup");
const resultEl = document.getElementById("result");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;
  monitoredFields.forEach((key) => {
    const ok = validateField(key);
    if (!ok) isFormValid = false;
  });

  if (isFormValid) {
    resultEl.className = "status-banner success";
    resultEl.textContent = "Welcome, Omkar! Your account was successfully created.";
    formEl.reset();
    strengthBar.style.width = "0";

    monitoredFields.forEach((key) => {
      document.getElementById(key).classList.remove("is-valid");
    });

    setTimeout(() => {
      resultEl.textContent = "";
      resultEl.className = "status-banner";
    }, 5000);
  } else {
    resultEl.className = "status-banner";
    resultEl.textContent = "";
  }
});

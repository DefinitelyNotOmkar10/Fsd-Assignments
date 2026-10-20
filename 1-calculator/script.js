/**
 * JavaScript Calculator Engine
 * Crafted by Omkar Kumbhar
 * Functional math dispatcher & state machine
 */

// Basic math primitives
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y === 0 ? "Error" : x / y);

// Evaluation controller with robust conditional branching
function computeOperation(val1, operator, val2) {
  switch (operator) {
    case "+":
      return add(val1, val2);
    case "-":
      return subtract(val1, val2);
    case "*":
      return multiply(val1, val2);
    case "/":
      return divide(val1, val2);
    default:
      return "Error";
  }
}

// State store
let displayValue = "0";
let storedOperand = null;
let activeOperator = null;
let resetOnNextInput = false;

// DOM references
const mainDisplay = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const symbolMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function renderDisplay() {
  mainDisplay.textContent = displayValue;
}

function formatResult(value) {
  if (value === "Error") return "Error";
  return String(Math.round(value * 1e10) / 1e10);
}

function triggerErrorState() {
  displayValue = "Error";
  storedOperand = null;
  activeOperator = null;
  resetOnNextInput = true;
  historyDisplay.textContent = "";
  renderDisplay();
}

function handleDigit(digit) {
  if (displayValue === "Error") displayValue = "0";

  if (resetOnNextInput) {
    displayValue = digit;
    resetOnNextInput = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  renderDisplay();
}

function handleDecimal() {
  if (displayValue === "Error") displayValue = "0";

  if (resetOnNextInput) {
    displayValue = "0.";
    resetOnNextInput = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  renderDisplay();
}

function handleOperator(op) {
  if (displayValue === "Error") return;
  const numericCurrent = parseFloat(displayValue);

  if (activeOperator !== null && !resetOnNextInput) {
    const outcome = computeOperation(storedOperand, activeOperator, numericCurrent);
    if (outcome === "Error") {
      triggerErrorState();
      return;
    }
    storedOperand = outcome;
    displayValue = formatResult(outcome);
  } else {
    storedOperand = numericCurrent;
  }

  activeOperator = op;
  resetOnNextInput = true;
  historyDisplay.textContent = `${formatResult(storedOperand)} ${symbolMap[op]}`;
  renderDisplay();
}

function handleEvaluation() {
  if (activeOperator === null || resetOnNextInput) return;
  const numericCurrent = parseFloat(displayValue);
  const outcome = computeOperation(storedOperand, activeOperator, numericCurrent);

  if (outcome === "Error") {
    triggerErrorState();
    return;
  }

  historyDisplay.textContent = `${formatResult(storedOperand)} ${symbolMap[activeOperator]} ${formatResult(numericCurrent)} =`;
  displayValue = formatResult(outcome);
  storedOperand = null;
  activeOperator = null;
  resetOnNextInput = true;
  renderDisplay();
}

function handleReset() {
  displayValue = "0";
  storedOperand = null;
  activeOperator = null;
  resetOnNextInput = false;
  historyDisplay.textContent = "";
  renderDisplay();
}

function handleBackspace() {
  if (displayValue === "Error" || resetOnNextInput) {
    handleReset();
    return;
  }
  displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
  renderDisplay();
}

// Event Delegation for keypad clicks
document.getElementById("keys").addEventListener("click", (evt) => {
  const btn = evt.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit) {
    handleDigit(btn.dataset.digit);
  } else if (btn.dataset.op) {
    handleOperator(btn.dataset.op);
  } else if (btn.dataset.action === "equals") {
    handleEvaluation();
  } else if (btn.dataset.action === "clear") {
    handleReset();
  } else if (btn.dataset.action === "back") {
    handleBackspace();
  } else if (btn.dataset.action === "dot") {
    handleDecimal();
  }
});

// Full keyboard navigation support
window.addEventListener("keydown", (evt) => {
  if (evt.key >= "0" && evt.key <= "9") {
    handleDigit(evt.key);
  } else if (["+", "-", "*", "/"].includes(evt.key)) {
    handleOperator(evt.key);
  } else if (evt.key === "Enter" || evt.key === "=") {
    evt.preventDefault();
    handleEvaluation();
  } else if (evt.key === "Backspace") {
    handleBackspace();
  } else if (evt.key === "Escape") {
    handleReset();
  } else if (evt.key === ".") {
    handleDecimal();
  }
});

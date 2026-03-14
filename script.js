const calculator = document.getElementById("calculator");

// Display
const display = document.createElement("input");
display.setAttribute("id", "result");
display.setAttribute("class", "display form-control mb-3");
display.setAttribute("readonly", true);
display.value = "0";
calculator.appendChild(display);

// Button layout
const rows = [
  [{text:"C", id:"clear"}, {text:"←", id:"backspace"}, {text:"÷", id:"divide"}, {text:"×", id:"multiply"}],
  [{text:"7", id:"7"}, {text:"8", id:"8"}, {text:"9", id:"9"}, {text:"-", id:"subtract"}],
  [{text:"4", id:"4"}, {text:"5", id:"5"}, {text:"6", id:"6"}, {text:"+", id:"add"}],
  [{text:"1", id:"1"}, {text:"2", id:"2"}, {text:"3", id:"3"}, {text:"=", id:"equal"}],
  [{text:"0", id:"0"}, {text:"00", id:"00"}, {text:"%", id:"modulus"}, {text:".", id:"dot"}]
];

// Create buttons dynamically
rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "d-flex justify-content-center");
  calculator.appendChild(rowDiv);

  row.forEach(btnObj => {
    const btn = document.createElement("button");
    btn.innerText = btnObj.text;
    btn.setAttribute("id", btnObj.id);
    btn.setAttribute("class", "btn btn-light");
    if (btnObj.id === "equal") btn.classList.add("equals");
    btn.addEventListener("click", () => handleButton(btnObj.text));
    rowDiv.appendChild(btn);
  });
});

// Handle button clicks
function handleButton(value) {
  if (value === "C") {
    display.value = "0";
  } else if (value === "←") {
    display.value = display.value.slice(0, -1) || "0";
  } else if (value === "=") {
    try {
      let expression = display.value.replace(/÷/g, "/").replace(/×/g, "*");
      display.value = eval(expression);
    } catch {
      alert("Invalid Expression");
    }
  } else {
    if (display.value === "0") display.value = "";
    display.value += value;
  }
}

// Keyboard events (only numbers allowed)
document.addEventListener("keydown", (event) => {
  if(event.key >= "0" && event.key <= "9") {
    if(display.value === "0") display.value = "";
    display.value += event.key;
  } else {
    alert("Only numbers are allowed");
  }
});
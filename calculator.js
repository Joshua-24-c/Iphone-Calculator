const buttonValues = [
    "MC", "MR", "M+", "M-",
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=", "BIN", "HEX", "OCT"
  ];
  
  const rightSymbols = ["÷", "×", "-", "+", "=", "BIN", "HEX", "OCT"];
  const topSymbols = ["AC", "+/-", "%", "MC", "MR", "M+", "M-"];
  
  const display = document.getElementById("display");
  const memoryDisplay = document.getElementById("memoryDisplay");
  
  let isNewEquation = false;
  let lastResult = "";
  let memory = 0;
  let memoryMode = "DEC";
  
  function updateMemoryDisplay() {
    let memVal = memory.toString(
      memoryMode === "BIN" ? 2 :
      memoryMode === "HEX" ? 16 :
      memoryMode === "OCT" ? 8 : 10
    ).toUpperCase();
  
    memoryDisplay.innerText = `M: ${memVal} (${memoryMode})`;
  }
  
  for (let i = 0; i < buttonValues.length; i++) {
    const value = buttonValues[i];
    const button = document.createElement("button");
    button.innerText = value;
  
    if (value === "0") {
      button.style.gridColumn = "span 2";
    }
  
    if (rightSymbols.includes(value)) {
      button.classList.add("operator");
    } else if (topSymbols.includes(value)) {
      button.classList.add("top");
    }
  
    button.addEventListener("click", function () {
      if (display.value === "Error" && !["BIN", "HEX", "OCT", "MR", "MC", "M+", "M-"].includes(value)) {
        display.value = "";
      }
  
      switch (value) {
        case "=":
          try {
            const expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
            const result = eval(expression);
            display.value = result;
            lastResult = result;
            isNewEquation = true;
          } catch {
            display.value = "Error";
          }
          break;
  
        case "AC":
          display.value = "";
          isNewEquation = false;
          break;
  
        case "+/-":
          const expression = display.value;
          const match = expression.match(/(\-?\d+\.?\d*)$/);
          if (match) {
            const number = match[0];
            const start = match.index;
            let before = expression.slice(0, start);
  
            if (number.startsWith('-')) {
              display.value = before + number.slice(1);
            } else {
              display.value = before + '-' + number;
            }
          }
          break;
  
        case "%":
          try {
            display.value = eval(display.value) / 100;
            isNewEquation = true;
          } catch {
            display.value = "Error";
          }
          break;
  
        case ".":
          const lastNumber = display.value.split(/[\+\-\×\÷]/).pop();
          if (!lastNumber.includes(".")) {
            if (isNewEquation) {
              display.value = ".";
              isNewEquation = false;
            } else {
              display.value += value;
            }
          }
          break;
  
        case "BIN":
        case "HEX":
        case "OCT":
          if (!isNewEquation || display.value === "" || display.value === "Error") {
            display.value = "Error";
            return;
          }
          const num = parseInt(lastResult);
          if (isNaN(num)) {
            display.value = "Error";
            return;
          }
  
          let converted;
          if (value === "BIN") {
            converted = num.toString(2);
            memoryMode = "BIN";
          } else if (value === "HEX") {
            converted = num.toString(16).toUpperCase();
            memoryMode = "HEX";
          } else if (value === "OCT") {
            converted = num.toString(8);
            memoryMode = "OCT";
          }
  
          display.value = converted;
          isNewEquation = true;
          updateMemoryDisplay();
          break;
  
        case "MC":
          memory = 0;
          memoryMode = "DEC";
          updateMemoryDisplay();
          break;
  
        case "MR":
          display.value = memory.toString();
          isNewEquation = true;
          break;
  
        case "M+":
          try {
            const current = eval(display.value);
            memory += current;
            memoryMode = "DEC";
            isNewEquation = true;
            updateMemoryDisplay();
          } catch {
            display.value = "Error";
          }
          break;
  
        case "M-":
          try {
            const current = eval(display.value);
            memory -= current;
            memoryMode = "DEC";
            isNewEquation = true;
            updateMemoryDisplay();
          } catch {
            display.value = "Error";
          }
          break;
  
        default:
          if (isNewEquation) {
            display.value = value;
            isNewEquation = false;
          } else {
            display.value += value;
          }
          break;
      }
    });
  
    document.getElementById("buttons").appendChild(button);
  }
  
  updateMemoryDisplay();
  
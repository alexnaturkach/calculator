let calcDisplay = ''; //variable to store display value as string
let firstArgument = 0; //variable to store current result/argument
let secondArgument = 0; //variable to display argument
let currentOperator = ''; //stores the value of the last operator clicked
let operatorList = ['add', 'subtract', 'multiply', 'divide'];
let result;
const display = document.getElementById('display');
const allOperators = document.querySelectorAll('.operators');

function equals() {
  if ((currentOperator !== '') & (calcDisplay !== '')) {
    secondArgument = parseFloat(calcDisplay.replace(",", ".")); //grabs current screen value as 2nd argument
    if (currentOperator === 'add') {
      result = firstArgument + secondArgument;
    } else if (currentOperator === 'subtract') {
      result = firstArgument - secondArgument;
    } else if (currentOperator === 'multiply') {
      result = firstArgument * secondArgument;
    } else if (currentOperator === 'divide') {
      if (secondArgument === 0) {
        reset();
        display.innerText = 'Error';
        return;
      } else {
        result = firstArgument / secondArgument;
      }
    }
    if (firstArgument.toString().length > 5) {
      display.style.fontSize = "1.9em";
    }
    if (result.toString().length > 8) {
      firstArgument = result; //saving the result of operation as a first argument
      calcDisplay = '';
      display.innerText = result.toExponential(5).toLocaleString('en-US').replace(/,/g, " ").replace('.', ',').replace('+', '');
    } else {
      firstArgument = result; //saving the result of operation as a first argument
      calcDisplay = '';
      display.innerText = result.toLocaleString('en-US').replace(/,/g, " ").replace('.', ',');
    }
  }

}

function reset() {
  result = '';
  firstArgument = 0;
  secondArgument = 0;
  currentOperator = '';
  calcDisplay = '';
  display.innerText = '0';
  display.style.fontSize = "2.8em";
}


//click listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('equals')) {
    equals();
    //firstArgument = result;
    currentOperator = '';
  }
  for (i = 0; i < allOperators.length; i++) { //remove highlight from the active operator
    if (allOperators[i].classList.contains('active')) {
      allOperators[i].classList.remove('active');
    }
  }
  if (e.target.classList.contains('numbers')) { //if clicked on Number add clicked number to the Display
    if (display.innerText === result) {
      //if display is showing the result of operation already, just reset the display screen
      display.innerText = '';
    }
    if (calcDisplay.length > 5) {
      display.style.fontSize = "1.9em";
    }
    if (calcDisplay.length < 10 & calcDisplay.includes('.')) { //limit amount of characters that can be entered in display
      calcDisplay = calcDisplay + e.target.innerText;
      display.innerText = calcDisplay.toLocaleString('en-US').replace(/,/g, " ").replace(".", ","); //format the output in Display
    } else if (calcDisplay.length < 9) {
      calcDisplay = calcDisplay + e.target.innerText;
      display.innerText = Number(calcDisplay).toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
    }
  }



  if (e.target.classList.contains('operators')) {
    //if clicked on operator and arguments are not empty, operate the arguments with the last selected operator
    if ((currentOperator !== '') & (calcDisplay !== '')) {
      equals();
    };
    //loop will check which operator is clicked and will save it to the CurrentOperator variable
    for (i = 0; i < 4; i++) {
      if (e.target.classList.contains(operatorList[i])) {
        currentOperator = operatorList[i];
      }
    }
    if (calcDisplay !== '') { //if display not empty, save it's value as a first argument
      firstArgument = parseFloat(calcDisplay.replace(",", "."));
      calcDisplay = ''; //reset the Display value after saving it as a first argument
    }
    e.target.classList.add('active');
  }
  if (e.target.classList.contains('comma') & !(calcDisplay.toString().includes('.'))) {
    if (calcDisplay === '') {
      calcDisplay = calcDisplay + '0.';
      display.innerText = calcDisplay.toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
    } else {
      calcDisplay = calcDisplay + '.';
      display.innerText = calcDisplay.toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
    }
  }

})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('percentage') & currentOperator !== 'percent') {
    if (currentOperator === '' & calcDisplay !== '') {
      result = parseFloat(calcDisplay.replace(",", "."));
      result = result / 100;
      display.innerText = result.toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
      currentOperator = 'percent';
    } else {
      equals();
      if (result !== undefined) {
        result = result / 100;
        display.innerText = result.toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
        currentOperator = 'percent';
      }
    }
  }

})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('negativeSwitch')) {
    if (calcDisplay === '') {
      if (result.toString().includes('-')) {
        result = result - result - result;
      } else {
        result = result - result - result;
      }
      calcDisplay = result + '';
    } else if (calcDisplay[0] !== '-') {
      calcDisplay = '-' + calcDisplay;
    } else {
      calcDisplay = calcDisplay.substring(1, calcDisplay[calcDisplay.length]);
    }
    display.innerText = calcDisplay;
  }
})

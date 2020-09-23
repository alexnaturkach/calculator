let calcDisplay = ''; //variable to store display value as string
let firstArgument = 0; //variable to store current result/argument
let secondArgument = 0; //variable to display argument
let currentOperator = ''; //stores the value of the last operator mouseuped
let operatorList = ['add', 'subtract', 'multiply', 'divide'];
let result;
let ac = false;
let mouseDown = false;
const acButton = document.querySelector('.clear');
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
    if (result.toString().length > 5) {
      display.style.fontSize = "1.9em";
    }
    if (result.toString().length > 8) {
      firstArgument = result; //saving the result of operation as a first argument
      calcDisplay = '';
      display.innerText = result.toExponential(5);
    } else {
      firstArgument = result; //saving the result of operation as a first argument
      calcDisplay = '';
      display.innerText = result;
    }
  }

}

function reset() {
  if (ac) {
    display.style.fontSize = "2.8em";
    acButton.innerText = 'AC';
    calcDisplay = '';
    display.innerText = '0';
    ac = false;
  } else {
    result = undefined;
    firstArgument = 0;
    secondArgument = 0;
    currentOperator = '';
    calcDisplay = '';
    display.innerText = '0';
    display.style.fontSize = "2.8em";
  }
}


//mouseup listeners
document.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('equals')) {
    equals();
    //firstArgument = result;
    currentOperator = '';
  }
  for (i = 0; i < allOperators.length; i++) { //remove highlight from the active operator
    if (allOperators[i].classList.contains('active') & !e.target.classList.contains('extra')) {
      allOperators[i].style.transition = '0.7s';
      allOperators[i].classList.remove('active');
    }
  }
  if (e.target.classList.contains('numbers')) { //if mouseuped on Number add mouseuped number to the Display
    ac = true;
    acButton.innerText = 'C';
    if (e.target.classList.contains('zero') & calcDisplay === "0") {
      return;
    }
    if (display.innerText === result || calcDisplay === '0') {
      //if display is showing the result of operation already, just reset the display screen
      display.innerText = '';
    }
    if (calcDisplay.length > 5) {
      display.style.fontSize = "1.9em";
    } else {
      display.style.fontSize = "2.8em";
    }
    if (calcDisplay.length < 10 & calcDisplay.includes('.')) { //limit amount of characters that can be entered in display
      if (calcDisplay === '-0') {
        calcDisplay = '-';
      }
      calcDisplay = calcDisplay + e.target.innerText;
      display.innerText = calcDisplay;
    } else if (calcDisplay.length < 9) {
      if (calcDisplay === '-0') {
        calcDisplay = '-';
      }
      calcDisplay = calcDisplay + e.target.innerText;
      display.innerText = calcDisplay;
    }
  }



  if (e.target.classList.contains('operators')) {
    //if mouseuped on operator and arguments are not empty, operate the arguments with the last selected operator
    if ((currentOperator !== '') & (calcDisplay !== '')) {
      equals();
    };
    //loop will check which operator is mouseuped and will save it to the CurrentOperator variable
    for (i = 0; i < 4; i++) {
      if (e.target.classList.contains(operatorList[i])) {
        currentOperator = operatorList[i];
      }
    }
    if (calcDisplay !== '') { //if display not empty, save it's value as a first argument
      firstArgument = parseFloat(calcDisplay);
      calcDisplay = ''; //reset the Display value after saving it as a first argument
    }
    e.target.style.transition = '0.7s';
    e.target.classList.add('active');
  }
  if (e.target.classList.contains('comma') & !(calcDisplay.toString().includes('.')) & calcDisplay.length < 9) {
    if (calcDisplay === '') {
      calcDisplay = calcDisplay + '0.';
      display.innerText = calcDisplay;
    } else {
      calcDisplay = calcDisplay + '.';
      display.innerText = calcDisplay;
    }
  }

})

document.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('percentage')) {
    if (currentOperator === '' & calcDisplay !== '') {
      result = parseFloat(calcDisplay);
      result = result / 100;
      currentOperator = '';
      calcDisplay = '';
      } else {
        equals();
        if (result !== undefined) {
          result = result / 100;
          currentOperator = '';
        }
      }
      if (result.toString().length > 5){
        display.style.fontSize = "1.9em";
      }
      if (result.toString().length > 8) {
        display.innerText = result.toExponential(2);
      }
      else {
        display.innerText = result;
      }
    }

})


document.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('negativeSwitch')) {
    if (display.innerText === 'Error') {
      reset();
    }
    if (result !== undefined & calcDisplay === '' & currentOperator === '') {
      if (result.toString().includes('-')) {
        result = result - result - result;
      } else {
        result = result - result - result;
      }
      calcDisplay = result + '';
    } else if (display.innerText === '0' & currentOperator === '') {
      calcDisplay = '';
      calcDisplay = '-' + '0';
    } else if (calcDisplay[0] !== '-') {
      if (firstArgument == display.innerText) {
        calcDisplay = '-0';
      } else {
        calcDisplay = '-' + display.innerText;
      }
    } else {
      calcDisplay = calcDisplay.substring(1, calcDisplay[calcDisplay.length]);
    }
    display.innerText = calcDisplay.toLocaleString('en-US').replace(/,/g, " ").replace(".", ",");
  }
})

document.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('clear') & !ac) {
    if (operatorList.includes(currentOperator)) {
      document.querySelector('.' + currentOperator).style.transition = '0.7s';
      document.querySelector('.' + currentOperator).classList.add('active');
    }
  }
})

document.addEventListener('mouseout', (e) => {
  e.target.style.transition = '0s';
})

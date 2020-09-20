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
      result = firstArgument / secondArgument;
    }
    firstArgument = result; //saving the result of operation as a first argument
    calcDisplay = '';
    display.innerText = result.toString().replace(".", ",");
  }
}

function reset() {
  result = 0;
  firstArgument = 0;
  secondArgument = 0;
  lastOperator = '';
  calcDisplay = '';
  display.innerText = '0';
}
//click listeners
document.addEventListener('click', (e) => {
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
    calcDisplay = calcDisplay + e.target.innerText;
    display.innerText = calcDisplay;
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
    if ((calcDisplay !== '') & (firstArgument !== result)) {
        firstArgument = parseFloat(calcDisplay.replace(",", "."));
        calcDisplay = ''; //reset the Display value after saving it as a first argument
      }
          e.target.classList.add('active');
    }

})

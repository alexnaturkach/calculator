let entry = '';
let a = 0;
let b = 0;
let lastOperator = '';
const display = document.getElementById('display');
let result;

// operator functions

function reset() {
  a = 0;
  b = 0;
  result = 0;
  display.innerHTML = '0';
  lastOperator = '';
  entry ='';
}


function add(){
  equals();
  if (lastOperator !== 'add'){
  a = parseInt(entry);
  entry = '';
  lastOperator = 'add';
  document.querySelector('.add').classList.toggle("active");
}
}

function subtract() {
  equals();
  if (lastOperator !== 'subtract'){
  a = parseInt(entry);
  entry = '';
  lastOperator = 'subtract';
}
}

function multiply() {
  equals();
  if (lastOperator !== 'multiply'){
  a = parseInt(entry);
  entry = '';
  lastOperator = 'multiply';
}
}

function divide() {
  equals();
  if (lastOperator !== 'divide'){
  a = parseInt(entry);
  entry = '';
  lastOperator = 'divide';

}
}

function equals() {
  let elems = document.querySelectorAll('.operators');
  elems.forEach.call(elems, function(el) {
    el.classList.remove('active');
  })
    if (lastOperator === 'add' & entry !== '') {
    b = parseInt(entry);
    result = a + b;
    //display.innerHTML;
    entry = result;
    display.innerHTML = result;
    lastOperator = 'equals';
  }

else if (lastOperator === 'subtract' & entry !== '') {
    b = parseInt(entry);
    result = a - b;
    //display.innerHTML;
    entry = result;
    display.innerHTML = result;
    lastOperator = 'equals';
  }
  else if (lastOperator === 'multiply' & entry !== '') {
      b = parseInt(entry);
      result = a * b;
      //display.innerHTML;
      entry = result;
      display.innerHTML = result;
      lastOperator = 'equals';
    }
    else if (lastOperator === 'divide' & entry !== '') {
        b = parseInt(entry);
        result = a / b;
        //display.innerHTML;
        entry = result;
        display.innerHTML = result;
        lastOperator = 'equals';
}}




//onclick functions

document.addEventListener('click', (e) => {
  let elems = document.querySelectorAll('.operators');

  if (entry === result & e.target.classList.contains('numbers')) {
    entry = '';
    display.innerHTML = entry;  elems.forEach.call(elems, function(el) {
        el.classList.remove('active');
      })
  }
  if (isNaN(entry) & e.target.classList.contains('numbers')){
    entry = '';
    display.innerHTML = entry;  elems.forEach.call(elems, function(el) {
        el.classList.remove('active');
      })
  }
  if ((isFinite(entry) !== true) & e.target.classList.contains('numbers')){
    entry = '';
    display.innerHTML = entry;  elems.forEach.call(elems, function(el) {
        el.classList.remove('active');
      })
  }
  if (e.target.classList.contains('numbers') & entry.length <9){
  entry = entry + e.target.innerHTML;
  display.innerHTML = entry;  elems.forEach.call(elems, function(el) {
      el.classList.remove('active');
    })
}
  if (entry.length > 5 & entry.length < 10) {
  display.style.fontSize = '2em';  elems.forEach.call(elems, function(el) {
      el.classList.remove('active');
    })
}

})

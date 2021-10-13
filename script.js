const result = document.querySelector('.result');

let runningTotal = 0;
let valueOne = "0";
let lastOperator = null;

function init() {
    document.querySelector(".button-continer").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

function buttonClick(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if(valueOne === 0) {
        valueOne = value;
    }else {
        valueOne += value;
    }
}

function handleSymbol(value) {
    switch (value)
    {
        case 'C':
            valueOne = '0';
            runningTotal = 0;
            break;

        case "=":
            if (lastOperator === null) {
                return;
            }
            flushOperation(parseInt(valueOne));
            lastOperator = null;
            valueOne = "" + runningTotal;
            runningTotal = 0;
            break;

        case "B":
            if(valueOne.length === 1) {
                valueOne = "0";
            }
            else{
                valueOne = valueOne.substring(0,valueOne.length -1);
            }
            break;

        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intValue = parseInt(valueOne);
    if(runningTotal === 0) {
        runningTotal = intValue;
    }
    else {
        flushOperation(intValue);
    }

    lastOperator = value;
    // console.log('previousOperation');

    valueOne = '0';
}

function flushOperation (intValue) {
    
    if(lastOperator === "+") {
        runningTotal += intValue;
    }
    else if(lastOperator === "-") {
        runningTotal -= intValue;
    }
    else if(lastOperator === "*") {
        runningTotal *= intValue;
    }
    else {
        runningTotal /= intValue;
    }
}

function rerender() {
    result.innerText = valueOne;
}

init();
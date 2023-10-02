const out = document.querySelector('.out');
const numbers = new RegExp(/[0-9]/);

function displayResult(arg) {
    out.textContent = arg;
}

class Calculator {
    bufferNumber;
    currentNumber;
    isDecimal;
    endInput;
    operation;

    constructor() {
        this.bufferNumber = 0;
        this.currentNumber = 0;
        this.isDecimal = false;
        this.endInput = false;
        this.operation = '';

    } 

    start = (inData) => {
        console.log(this.currentNumber, this.bufferNumber);
        if(this.currentNumber !== 0) {
            this.bufferNumber = this.currentNumber;
        }
        if(inData === 'ac' || inData === 'sign' || inData === 'percent') {
            if(inData === 'ac') {
                this.bufferNumber = 0;
                this.currentNumber = 0;
                this.operation = '';
            }
            else if(inData === 'sign') {
                console.log("Sign-change found");
                this.bufferNumber *= -1;
                
            }
            else if(inData === 'percent'){
                console.log("Percentage found");
                this.bufferNumber /= 100;
            
            }
            this.currentNumber = this.bufferNumber;
            this.endInput = true;
            displayResult(this.currentNumber);
        }
        else {
            this.calculatorCore(inData);
        }
    
    }

    calculatorCore = (inData) => {
        if(numbers.test(inData) || (inData === '.' && this.isDecimal === false)) {
            this.getNumber(inData);
            this.endInput = false; 
        }
        else {
            this.endInput = true;
            if(this.operation != '') {
                this.mathOperations(this.operation);
                console.log(this.currentNumber, this.bufferNumber, this.operation);
            }
            else {
                this.currentNumber = this.bufferNumber;
            }
            displayResult(this.currentNumber);
            this.bufferNumber = 0;
            this.operation = inData;
            console.log(this.currentNumber, this.bufferNumber, this.operation);
        }
    }
    
    mathOperations(operator) {
        if(operator === 'divide' && this.bufferNumber !== 0) {
            console.log("Divide found");
            return this.currentNumber /= this.bufferNumber;
        }
        else if(operator === 'multiply') {
            console.log("Multiply found");
            return this.currentNumber *= this.bufferNumber;
        }
        else if(operator === 'plus') {
            console.log("Plus found");
            return this.currentNumber += this.bufferNumber;
        }
        else if(operator === 'minus'){
            console.log("Minus found");
            return this.currentNumber -= this.bufferNumber; 
    
        }
        else {
            console.log("Equals found");

        }
    }

    getNumber = (key) => {
        if (this.endInput) {
            displayResult('0');
        }

        out.textContent += key;
        this.bufferNumber = Number(out.textContent);
    
        if(key === '.' || this.bufferNumber === 0 && this.isDecimal === true) {
            this.isDecimal = true;
        }
        else {
            out.textContent = this.bufferNumber;
        }
    }

}


var calc = new Calculator();

[...document.querySelectorAll('button[data-action]')].forEach((actionNode) => {
	actionNode.addEventListener('click', () => {
  	const input = actionNode.dataset.action;
    console.log('input', input);
    calc.start(input);

  })
})




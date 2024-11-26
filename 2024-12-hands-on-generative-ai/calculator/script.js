class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = `${this.currentOperand} ${operation}`;
        this.shouldResetScreen = true;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        document.querySelector('.previous-operand').textContent = this.previousOperand;
    }

    plusMinus() {
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    }

    percentage() {
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    }
}

const calculator = new Calculator();

// Event Listeners
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.action === 'equals') {
            calculator.compute();
        } else {
            calculator.chooseOperation(button.textContent);
        }
        calculator.updateDisplay();
    });
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('[data-action="plusminus"]').addEventListener('click', () => {
    calculator.plusMinus();
    calculator.updateDisplay();
});

document.querySelector('[data-action="percentage"]').addEventListener('click', () => {
    calculator.percentage();
    calculator.updateDisplay();
}); 
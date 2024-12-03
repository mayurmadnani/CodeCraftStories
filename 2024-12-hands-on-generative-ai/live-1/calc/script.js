
// Placeholder for actual calculator logic
console.log('Calculator initialized');
let expression = '';
let currentNumber = '';
let resultDisplayed = false;

const buttons = document.querySelectorAll('.btn');
const displayExpression = document.querySelector('.expression');
const displayResult = document.querySelector('.result');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btnValue = e.target.innerText;

        if (btnValue === 'AC') {
            expression = '';
            currentNumber = '';
            displayExpression.innerText = '';
            displayResult.innerText = '0';
            return;
        }

        if (btnValue === '=') {
            try {
                displayResult.innerText = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
                resultDisplayed = true;
            } catch {
                displayResult.innerText = 'Error';
            }
            return;
        }

        if (resultDisplayed) {
            expression = displayResult.innerText;
            displayExpression.innerText = expression;
            resultDisplayed = false;
        }

        expression += btnValue;
        displayExpression.innerText = expression;
    });
});

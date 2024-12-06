document.addEventListener("DOMContentLoaded", () => {
    let display = document.querySelector(".current-operand");
    let previousDisplay = document.querySelector(".previous-operand");
    let buttons = Array.from(document.querySelectorAll("button"));

    buttons.map(button => {
        button.addEventListener("click", (e) => {
            const target = e.target.innerText;
            if (target === "AC") {
                display.innerText = "";
                previousDisplay.innerText = "";
            } else if (target === "+/-") {
                display.innerText = parseFloat(display.innerText) * -1;
            } else if (target === "=") {
                try {
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error";
                }
            } else if (target === "÷") {
                display.innerText += "/";
            } else if (target === "×") {
                display.innerText += "*";
            } else {
                display.innerText += target;
            }
        });
    });
});

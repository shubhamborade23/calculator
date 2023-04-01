//Selectors
let numbers = document.querySelectorAll(".numbers")
let operators = document.querySelectorAll(".operators")

let equalto = document.querySelector(".equalto")
let clear = document.querySelector(".clear")
let backspace = document.querySelector(".backspace")
let plusMinus = document.querySelector(".plus-minus")
let dot = document.querySelector(".dot")

let display = document.querySelector(".display")
let output = document.querySelector(".output")

let equaltoPressed = false;

//Event Listeners
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        if (equaltoPressed) {
            display.textContent = "";
            equaltoPressed = false;
        }
        //if condition so that if the display has "Infinity" on it, we don't append digits
        if ("0123456789.+-×÷".includes(display.textContent[display.textContent.length - 1]) || display.textContent == "")
            display.textContent += this.textContent;
        evaluate();
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
        equaltoPressed = false;
        if ("+-×÷".includes(display.textContent[display.textContent.length - 1]))
            display.textContent = display.textContent.substring(0, display.textContent.length - 1) + this.textContent;
        else
            display.textContent += this.textContent;
    })
}

equalto.addEventListener("click", function () {
    if (output.textContent !== "") {
        display.textContent = output.textContent;
        output.textContent = "";
        equaltoPressed = true;
    }
});

clear.addEventListener("click", function () {
    equaltoPressed = false;
    display.textContent = "";
    output.textContent = "";
})


backspace.addEventListener("click", function () {
    equaltoPressed = false;
    display.textContent = display.textContent.substr(0, display.textContent.length - 1);
    evaluate();
})


plusMinus.addEventListener("click", function () {
    equaltoPressed = false;
    let expression = display.textContent;
    let flag = true;

    for (let i = expression.length - 1; i >= 0; i--) {
        if ("+-×÷".includes(expression[i])) {
            if (expression[i] !== "-")
                expression = expression.substring(0, i + 1) + "-" + expression.substring(i + 1, expression.length);
            flag = false;
            break;
        }
    }

    if (flag)
        expression = "-" + expression;
    display.textContent = expression;

    evaluate();
})


dot.addEventListener("click", function () {
    if (equaltoPressed)
        display.textContent = "";
    let start = 0;
    for (let i = display.textContent.length - 1; i >= 0; i--) {
        if ("+-×÷".includes(display.textContent[i])) {
            start = i + 1;
            break;
        }
    }
    if (!display.textContent.substring(start, display.textContent.length).includes("."))
        display.textContent += ".";
})

//Functions
function evaluate() {
    let expression = display.textContent;

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "×")
            expression = expression.substring(0, i) + "*" + expression.substring(i + 1, expression.length);
        if (expression[i] === "÷")
            expression = expression.substring(0, i) + "/" + expression.substring(i + 1, expression.length);
    }

    if ("0123456789.".includes(expression[expression.length - 1]) && eval(expression) != expression)
        output.textContent = eval(expression);
    else
        output.textContent = "";
}


// .display and .output font resizing changing addon
let displayCover = document.querySelector(".display-cover");
let outputCover = document.querySelector(".output-cover");
let displaySize;
let outputSize;
// This part is a config of MutationObserver, options for the observer (which mutations to observe) 
let config = {
    attributes: true,
    childList: true,
    characterData: true
};

// Defining new class of the object MutationObserver, which provides the ability to watch for changes being made to the DOM tree. Basically - this class will be executed on every observing changes in '.display'.
let displayObserver = new MutationObserver(function (mutations) {

    displaySize = 100; // we will use it like a base 100% font-size later
    // set font size to '.display-cover'
    displayCover.style.cssText = 'font-size:' + displaySize + '%';

    // 'while' statement creates a loop that executes a specified statement as long as the test condition evaluates to true. The condition is evaluated before executing the statement. Each time we set font size -1 - the width of '.display' changes, and we keeping this loop until the width of '.display' will be not more then it's parent '.display-cover' 
    while (display.offsetWidth > displayCover.offsetWidth) {
        displaySize = displaySize - 1; //decrements font size by 1% each loop
        displayCover.style.cssText = 'font-size:' + displaySize + '%';
        // basically in DOM you see only result of the very last loop of this 'while' statment    
    }

});

// Start observing the target node (your '.display') for configured mutations (using config)
displayObserver.observe(display, config);

//----------

// everything the same as above, but for '.output'
let outputObserver = new MutationObserver(function (mutations) {
    outputSize = 100;
    outputCover.style.cssText = 'font-size:' + outputSize + '%';
    while (output.offsetWidth > outputCover.offsetWidth) {
        outputSize = outputSize - 1;
        outputCover.style.cssText = 'font-size:' + outputSize + '%';
    }
});

// as you can see, 'config' is the same
outputObserver.observe(output, config);
/**
 * function to calculate string contains numbers and operator.
 * @param {String} string - any text.
 * @returns result - in number.
 */
function calculateString(string) {
    var operands = string.match(/\d+(\.\d+)?/g).map(parseFloat);
    var operators = string.match(/[+\-*%/]/g);
    var result = operands[0];
    for (var i = 0; i < operators.length; i++) {
        var operator = operators[i];
        var operand = operands[i + 1];
        if (operator == "+") {
            result += operand;
        } else if (operator == "-") {
            result -= operand;
        } else if (operator == "*") {
            result *= operand;
        } else if (operator == "/") {
            result /= operand;
        } else if (operator == "%") {
            result %= operand;
        }
    }
    return result;
}

/**
 * function to show calculated result.
 */
function result() {
    var temp = '';
    $('#calculator-buttons .value').on('click', function (e) {
        $('.initial-value').remove();
        var clickedValue = $(this).attr('data-value');
        var html = '<span class="result-num">' + clickedValue + '</span>'
        $('.result-display').append(html);
        $('#result-display').attr('data-display-values', temp += clickedValue);
    });

    $('.show-result').on('click', function () {
        var displayOutputString = $('#result-display').attr('data-display-values');
        var result = calculateString(displayOutputString);
        $('.result-display').html('<span class="result-num">' + result + '</span>');
    })
}

/**
 * function to clear all chars from display.
 */
function clear() {
    $('.ac-btn').on('click', function () {
        $('.result-num').remove();
        $('.result-display').attr('data-display-values', 0).append('<span class="result-num initial-value">0</span>');
    });
}

/**
 * function to clear last digit of displayed values.
 */
function clearLastChar() {
    $('.trim-result').on('click', function () {
        $('.result-num:last-child').remove();
    });
}


// call functions here.
$(document).ready(function (e) {
    result();
    clear();
    clearLastChar();
});
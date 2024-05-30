document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    const equalsButton = document.getElementById('equals');
    let error = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.textContent;
            if (value === 'C') {
                clearDisplay();
                error = false; // Limpiar el mensaje de error al presionar "C"
            } else if (value === '=') {
                calculateResult();
            } else if (value === '⌫') { // Botón de retroceso
                if (!error) {
                    let currentExpression = display.value;
                    display.value = currentExpression.slice(0, -1); // Elimina el último carácter
                }
            } else {
                if (error) {
                    // Limpiar el mensaje de error al ingresar un nuevo número
                    clearDisplay();
                    error = false;
                }
                appendToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        display.value = '';
    }

    function appendToDisplay(value) {
        display.value += value;
    }

    function calculateResult() {
        try {
            let expression = display.value.replace(/sqrt(\d+)/g, 'Math.sqrt($1)');
            expression = expression.replace('^', '**');
            let result = eval(expression);
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid expression');
            }
            display.value = result;
        } catch (e) {
            display.value = 'Error';
            error = true;
        }
    }
});

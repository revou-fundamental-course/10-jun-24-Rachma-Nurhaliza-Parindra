let lastConversion = "CtoF"; // Initialize to track the last conversion type

function isNumberKey(evt) {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        return false;
    }
    return true;
}

function convertToFahrenheit() {
    const celsiusInput = document.getElementById("celsius").value;
    if (celsiusInput === "") {
        return; // Do nothing if the input is empty
    }
    const celsius = parseFloat(celsiusInput);
    const fahrenheit = (celsius * 9) / 5 + 32;
    document.getElementById("fahrenheit").value = fahrenheit;
    updateCalculation(celsius, fahrenheit, "C");
    lastConversion = "CtoF";
    updateMethodText("CtoF");
}

function convertToCelsius() {
    const fahrenheitInput = document.getElementById("fahrenheit").value;
    if (fahrenheitInput === "") {
        return; // Do nothing if the input is empty
    }
    const fahrenheit = parseFloat(fahrenheitInput);
    const celsius = ((fahrenheit - 32) * 5) / 9;
    document.getElementById("celsius").value = celsius;
    updateCalculation(fahrenheit, celsius, "F");
    lastConversion = "FtoC";
    updateMethodText("FtoC");
}

function resetInput() {
    document.getElementById("celsius").value = "";
    document.getElementById("fahrenheit").value = "";
    document.getElementById("calculation-text").value = ""; // Clear calculation display
    lastConversion = "CtoF"; // Reset the last conversion type
}

function reverseConversion() {
    const celsiusInput = document.getElementById("celsius").value;
    const fahrenheitInput = document.getElementById("fahrenheit").value;

    if (lastConversion === "CtoF" && fahrenheitInput !== "") {
        const fahrenheit = parseFloat(fahrenheitInput);
        const celsius = ((fahrenheit - 32) * 5) / 9;
        document.getElementById("celsius").value = celsius;
        document.getElementById("calculation-text").value = `${fahrenheit}°F - 32 * (5/9) = ${celsius}°C`;
        updateMethodText("FtoC");
        lastConversion = "FtoC";
    } else if (lastConversion === "FtoC" && celsiusInput !== "") {
        const celsius = parseFloat(celsiusInput);
        const fahrenheit = (celsius * 9) / 5 + 32;
        document.getElementById("fahrenheit").value = fahrenheit;
        document.getElementById("calculation-text").value = `${celsius}°C * (9/5) + 32 = ${fahrenheit}°F`;
        updateMethodText("CtoF");
        lastConversion = "CtoF";
    }
}

function updateCalculation(input, output, unit) {
    const calculationText = document.getElementById("calculation-text");
    if (input === 0 && output === 0) {
        calculationText.value = ""; // Clear calculation text if input and output are zero
    } else {
        if (unit === "C") {
            calculationText.value = `${input}°C * (9/5) + 32 = ${output}°F`;
        } else if (unit === "F") {
            calculationText.value = `${input}°F - 32 * (5/9) = ${output}°C`;
        }
    }
}

function updateMethodText(conversionType) {
    const methodText = document.getElementById("method");
    const description = document.getElementById("conversion-description");
    const formula = document.getElementById("conversion-formula");
    const formulaAlt = document.getElementById("conversion-formula-alt");

    if (conversionType === "CtoF") {
        methodText.textContent = "Cara Konversi Dari Celcius (°C) ke Fahrenheit (°F)";
        description.textContent = "Suhu S dalam derajat Fahrenheit (°F) sama dengan suhu S dalam derajat Celsius (°C) kali 9/5 tambah 32.";
        formula.textContent = "S(°F) = (S(°C) x 9/5) + 32";
        formulaAlt.textContent = "S(°F) = (S(°C) x 1.8) + 32";
    } else {
        methodText.textContent = "Cara Konversi Dari Fahrenheit (°F) ke Celcius (°C)";
        description.textContent = "Suhu S dalam derajat Celcius (°C) sama dengan suhu S dalam derajat Fahrenheit (°F) kurang 32 kali 5/9.";
        formula.textContent = "S(°C) = (S(°F) - 32) x 5/9";
        formulaAlt.textContent = "S(°C) = (S(°F) - 32) x 0.5556";
    }
}
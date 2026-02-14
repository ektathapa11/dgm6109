"use strict"; // Strict mode helps catch mistakes

// Function to display messages in the output div
function output(message) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += message + "<br>"; // Show each message on a new line
}

// Add click event to the Convert button
document.getElementById("submit")
.addEventListener("click", function() {

    // Get user input for Fahrenheit temperature
    let fahrenheit = document.getElementById("inputF").value;
    // Get conversion choice (Celsius or Kelvin)
    let conversionType = document.getElementById("conversionChoice").value;

    // Convert input string to number
    fahrenheit = parseFloat(fahrenheit);

    // Check if input is a number
    if (isNaN(fahrenheit)) {
        output("Invalid input. Please enter a number."); // Show error for invalid input
        return; // Stop further execution
    }

    // Calculate Celsius and Kelvin
    let celsius = (fahrenheit - 32) * 5 / 9;
    let kelvin = celsius + 273.15; // Fixed Kelvin calculation

    // Always display original Fahrenheit
    output("Original temperature (Fahrenheit): " + fahrenheit + "°F");

    // ======================
    // Conditional logic version 1: if/else (preferred)
    // ======================
    if (conversionType === "c") {
        output("Converted temperature (Celsius): " + celsius.toFixed(2) + "°C");
    } else {
        output("Converted temperature (Kelvin): " + kelvin.toFixed(2) + "K");
    }

    // ======================
    // Conditional logic version 2: two separate ifs (commented out)
    // ======================
    /*
    if (conversionType === "c") {
        output("Converted temperature (Celsius): " + celsius.toFixed(2) + "°C");
    }
    if (conversionType === "k") {
        output("Converted temperature (Kelvin): " + kelvin.toFixed(2) + "K");
    }
    */

    /*
    I prefer the if/else version because it ensures only one output happens.
    The two-if version works too, but if the conditions are not mutually exclusive,
    it could accidentally show both outputs. Using if/else is safer for this program.
    */
});

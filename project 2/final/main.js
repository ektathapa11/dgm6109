"use strict";

/**
 * processForm
 * This function handles the button click. it reads what the user typed,
 * checks for mistakes, and either shows errors or calculates the total.
 * Parameters: None.
 * Returns: boolean - returns false if there are errors, otherwise returns the evaluation result.
 */
function processForm() {
    // Getting the values from the HTML inputs
    const comboChoice = document.getElementById("combo").value;
    const quantityRaw = document.getElementById("quantity").value;
    const zipCode = document.getElementById("zipcode").value.trim();
    const quantityNum = Number(quantityRaw);

    // Clear out the previous message before starting new checks
    output("", true);

    // This array will hold any error messages we find
    const errors = [];

    // Make sure they actually picked a food item
    if (comboChoice === "") {
        errors.push("Please select a combo.");
    }

    // Check if quantity is a valid whole number bigger than zero [cite: 58]
    if (quantityRaw === "" || isNaN(quantityNum) || quantityNum <= 0 || quantityNum % 1 !== 0) {
        errors.push("Quantity must be a whole number greater than 0.");
    }

    // Check that the ZIP is exactly 5 characters long [cite: 58]
    if (zipCode.length !== 5) {
        errors.push("ZIP code must be exactly 5 digits.");
    } else {
        // Loop through each character to make sure they are all numbers [cite: 8, 11]
        for (let i = 0; i < zipCode.length; i++) {
            if (zipCode[i] < "0" || zipCode[i] > "9") {
                errors.push("ZIP code must contain only numbers.");
                break;
            }
        }
    }

    // If we found any errors, build a list and show them all 
    if (errors.length > 0) {
        let errorHtml = "<strong>Please fix the following:</strong><ul>";
        for (let j = 0; j < errors.length; j++) {
            errorHtml += "<li>" + errors[j] + "</li>";
        }
        errorHtml += "</ul>";
        output(errorHtml, false);
        return false;
    }

    // If everything is valid, move to the calculation step
    return evaluateAnswers(comboChoice, quantityNum, zipCode);
}

/**
 * evaluateAnswers
 * This function does the math. It checks for special rules like the e. coli 
 * outbreak and applies discounts if the user ordered enough.
 * Parameters: 
 * combo (String): The food item name.
 * quantity (Number): How many they want.
 * zip (String): The 5-digit zip code.
 * Returns: boolean - true if the order goes through, false if it hits an exception.
 */
function evaluateAnswers(combo, quantity, zip) {
    let basePrice = 0;
    let isDiscounted = false;
    
    // Set the price based on what they picked [cite: 62, 63, 64]
    if (combo === "Pizza & Salad") {
        basePrice = 12.00;
    } else if (combo === "Taco Platter") {
        basePrice = 10.00;
    } else if (combo === "Hamburger & Fries") {
        basePrice = 8.00;
    }

    // E. coli rule: No pizza for zip codes starting with 9 
    if (combo === "Pizza & Salad" && zip.charAt(0) === "9") {
        output("Due to the e. coli outbreak, Pizza & Salad is not available in this region.", false);
        return false;
    }

    // Calculate the basic total
    let totalPrice = basePrice * quantity;

    // Apply 25% discount if they get 3 or more pizzas or burgers 
    if ((combo === "Hamburger & Fries" || combo === "Pizza & Salad") && quantity >= 3) {
        totalPrice = totalPrice * 0.75;
        isDiscounted = true;
    }

    // Turn the number into a currency string with two decimals [cite: 67, 70]
    const formattedPrice = "$" + totalPrice.toFixed(2);

    // Create the final success message [cite: 66, 67]
    let resultMsg = "Your order of " + quantity + " " + combo + " will be available at our store location in ZIP code " + zip + ".<br>";
    resultMsg += "You will be charged " + formattedPrice + " when you pick it up.";

    // Add the extra discount text if they earned it [cite: 68]
    if (isDiscounted) {
        resultMsg += " This includes a 25% discount for ordering " + quantity + " of this item.";
    }

    // Show the success message in green
    output(resultMsg, true);
    
    // Hide the submit button and show reset so they can start over [cite: 52]
    document.getElementById("submit").setAttribute("hidden", "hidden");
    document.getElementById("reset").removeAttribute("hidden");
    
    return true;
}

// Attach the click event to the submit button using a standard function
document.getElementById("submit").addEventListener("click", function() {
    processForm();
});

// Reset logic to clear the form and reset the buttons
document.getElementById("reset").addEventListener("click", function() {
    document.getElementById("orderForm").reset();
    output("", true);
    document.getElementById("submit").removeAttribute("hidden");
    document.getElementById("reset").setAttribute("hidden", "hidden");
});
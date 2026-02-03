"use strict";

/**
 * output
 * This helper function puts text into the 'output' div and changes the color.
 * Parameters: 
 * message (String): The text/HTML to show.
 * success (Boolean): True for green text, false/undefined for red.
 * Returns: Nothing.
 */
function output(message, success) {
    const display = document.getElementById("output");
    
    // Default success to false if it isn't provided
    if (success === undefined) {
        success = false;
    }

    display.innerHTML = message;
    
    // Green for success, red for errors
    if (success === true) {
        display.style.color = "green";
    } else {
        display.style.color = "red";
    }
}
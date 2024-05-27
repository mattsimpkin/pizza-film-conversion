const build = 2.2; // Variable declared to show build number. Updated each time the files have been updated.

// // Initial update when the page loads
$(document).ready(function () {
    setButtonDisabled(BUTTON_IDS.CUSTOMER_BTN, true); // Disables customer-btn untill a supplier has been specified using the supplier-btn
    setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, true); // Disables the filmspec-btn untill a customer has been specified using the customer-btn
    $("#input-group").prop("hidden", true); // Hides the input and output elements on page load
    $("#spec-text").prop("hidden", true); // Hides the film specification information on page load
    $("#howto-modal").prop("hidden", true); // Hides the Help modal until required.
    $("#build-num").text("Build: " + build); // Displays build number for version control
});

// Function created to calculate the average weight p/m off the roll.
function readyConversion(min, max, setting) {

    let numOne = (max - min) / 2; // Calculate the difference between max and min and halve it
    let numTwo = (min + numOne).toFixed(4); // Add the value from the previous line to min to find the middle value and set it to 4 decimal places

    let avgMeterWeight = (numTwo / setting).toFixed(4); // Calculate the average meter weight by dividing numTwo by the setting

    // Update the text content on the page
    $("#text-tol-min").text("Min tolerance: " + min + "Kg");
    $("#text-tol-max").text("Max tolerance: " + max + "Kg");
    $("#text-machineSetting").text("Machine Setting: " + setting + "m");
    $("#text-weight-avg").text("Equation based on " + avgMeterWeight + "kg p/meter of film.");

    // Function to update the output value
    function inputConversion() {
        let numOne = parseFloat($("#input-one").val()); // Retrieve the value of the input field and convert it to a number
        let result = Math.round(numOne / avgMeterWeight);

        if (isNaN(result)) {
            $("#output-one").text("Waiting for input...");
        } else {
            $("#output-one").val(result + "m (approx)"); // Set the text content of #output-one to the rounded value of numOne divided by avgMeterWeight
            updateColor(result); // Update the color based on the new value
        }
    }

    // Function to update the color of the output text
    function updateColor(num) {
        let maxToleranceProduct = Math.round(max / avgMeterWeight); // Calculates roll weight at max tolerance
        let minToleranceProduct = Math.round(min / avgMeterWeight); // Calculates roll weight at min tolerance
        if (num > maxToleranceProduct || num < minToleranceProduct) {  // Compares if the output figure fits between the min and max tolerance ranges
            $("#output-one").css("color", "red"); // Change the color of the output text to red
        } else {
            $("#output-one").css("color", "green"); // If the value isn't exceeded then the output text is defaulted to green
        }
    }

    $("#input-one").on("input", function () {
        inputConversion(); // Call inputConversion function to update the output value when input changes
    });

    // Initial conversion to set the output based on any pre-existing input value
    inputConversion();
}


function processReadyConversion(key) {
    const settings = READY_CONVERSION_SETTINGS[key];
    if (settings) {
        readyConversion(settings.min, settings.max, settings.setting);
    } else {
        console("Error: No settings found for key in 'processReadyConversion': " + key); // Error handling for unhandled keys
    }

    $("#howto-modal").prop("hidden", false); // Displays the How to icon
    $("#intro-text").prop("hidden", true); // Hides the intro text
    $("#disclaimer").prop("hidden", true); // Hides the disclaimer text
    $("#spec-text").prop("hidden", false); // Reveals the Specification text
    $("#input-group").prop("hidden", false); //Reveals the input group
    $("#input-one").val("Input roll weight in KG."); // Changes input-one value
}



//EVENT HANDLERS

// Constants for IDs and text values
const BUTTON_IDS = {
    SUPPLIER_BTN: "#supplier-btn",
    CUSTOMER_BTN: "#customer-btn",
    FILMSPEC_BTN: "#filmspec-btn",
    SUPPLIER_PACK: "#supplier-pack",
    SUPPLIER_ASAHI: "#supplier-asahi",
    CUSTOMER_PACK: "#customer-pack",
    CUSTOMER_ASAHI_ASDA: "#customer-asahi-asda",
    CUSTOMER_ASAHI_MORRISONS: "#customer-asahi-morrisons",
    CUSTOMER_ASAHI_SAINSBURYS: "#customer-asahi-sainsburys",
};

const BUTTON_TEXTS = {
    SUPPLIER_BTN: {
        DEFAULT: "Film Supplier",
        PACK: "Packaging 4 Ltd",
        ASAHI: "Marubeni (EU) GmbH"
    },
    CUSTOMER_BTN: {
        DEFAULT: "Customer",
        PACK: "Packaging 4 Ltd Customers",
        ASDA: "Bunzl Asda",
        MORRISONS: "Bunzl Morrisons",
        SAINSBURYS: "Bunzl Sainsbury's"
    },
    FILM_SPECS: {
        DEFAULT: "Film Specification",
        PACK15: '15" x 15" (380mm)',
        PACK18: '18" x 18" (450mm)',
        PACK20: '20" x 20" (500mm)',
        PACK22: '22" x 22" (550mm)',
        PACK24: '24" x 24" (600mm)',
        PACK27: '27" x 27" (680mm)',
        ASAHI600: '600mm x 600mm',
        ASAHI680: '680mm x 680mm',
        ASAHI20: '20" x 20" (500mm)',
        ASAHI22: '22" x 22" (550mm)',
        ASAHI27: '27" x 27" (680mm)',
    }
};

// Constants to store arrays of which specs belong to which customer
const SPEC_IDS = {
    PACK: ["#pack-15", "#pack-18", "#pack-20", "#pack-22", "#pack-24", "#pack-27"],
    ASDA: ["#asahi-600", "#asahi-680"],
    MORRISONS: ["#asahi-20", "#asahi-22", "#asahi-27"],
    SAINSBURYS: ["#asahi-20", "#asahi-27"]
};

// Constants to store the tolerances and settings of each film spec.
const READY_CONVERSION_SETTINGS = {
    "reset": { min: 0, max: 0, setting: 0 },
    "#pack-15": { min: 1.9, max: 2.2, setting: 475 },
    "#pack-18": { min: 2.2, max: 2.5, setting: 450 },
    "#pack-20": { min: 2.3, max: 2.6, setting: 425 },
    "#pack-22": { min: 2.7, max: 2.9, setting: 440 },
    "#pack-24": { min: 2.9, max: 3.2, setting: 450 },
    "#pack-27": { min: 3.0, max: 3.3, setting: 400 },
    "#asahi-600": { min: 4.2, max: 4.6, setting: 666 },
    "#asahi-680": { min: 3.0, max: 3.3, setting: 400 },
    "#asahi-20": { min: 2.7, max: 3.0, setting: 500 },
    "#asahi-22": { min: 3.0, max: 3.3, setting: 500 },
    "#asahi-27": { min: 3.8, max: 4.1, setting: 500 }
};

// Functions to update UI elements
function updateButtonText(buttonId, text) {
    $(buttonId).text(text);
}

function setButtonDisabled(buttonId, isDisabled) {
    $(buttonId).prop("disabled", isDisabled);
}

function dropdownReset() {
    setButtonDisabled(BUTTON_IDS.CUSTOMER_BTN, true);
    setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, true);
    updateButtonText(BUTTON_IDS.SUPPLIER_BTN, BUTTON_TEXTS.SUPPLIER_BTN.DEFAULT);
    updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.DEFAULT);
    updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.DEFAULT);
    processReadyConversion("reset");
}

function setElementsHidden(elementGroups, hidden) {
    elementGroups.forEach(group => {
        if (Array.isArray(group)) {
            group.forEach(id => {
                $(id).prop('hidden', hidden);
            });
        } else {
            $(group).prop('hidden', hidden);
        }
    });
}

// Event listeners for drop down items
$(".dropdown-menu").on("click", ".dropdown-item", function () {
    console.log("Dropdown item clicked:", this); // Log the entire clicked element used for error handling
    let buttonID = this.id;
    buttonAction(buttonID);
});

$("#supplier-btn").on("click", function () {
    console.log("supplier-btn clicked"); // Log the entire clicked element used for error handling
    dropdownReset();
});

$("#customer-btn").on("click", function () {
    console.log("customer-btn clicked"); // Log the entire clicked element used for error handling
    setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, true);
    updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.DEFAULT);
    processReadyConversion("reset");
});

// Button action handler
function buttonAction(key) {

    switch (key) {
        case "supplier-pack": // Decides what happens when Supplier -> Packaging 4 Ltd is selected.
            updateButtonText(BUTTON_IDS.SUPPLIER_BTN, BUTTON_TEXTS.SUPPLIER_BTN.PACK);
            updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.PACK);


            setButtonDisabled(BUTTON_IDS.CUSTOMER_BTN, false);
            setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, false);

            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_ASAHI_ASDA,
                    BUTTON_IDS.CUSTOMER_ASAHI_MORRISONS,
                    BUTTON_IDS.CUSTOMER_ASAHI_SAINSBURYS,
                    SPEC_IDS.SAINSBURYS,
                    SPEC_IDS.ASDA,
                    SPEC_IDS.MORRISONS
                ],
                true
            );

            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_PACK,
                    SPEC_IDS.PACK,
                ],
                false
            );
            break;

        case "supplier-asahi": // Decides what happens when Supplier -> Marubeni (EU) GmbH is selected.
            updateButtonText(BUTTON_IDS.SUPPLIER_BTN, BUTTON_TEXTS.SUPPLIER_BTN.ASAHI);
            updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.DEFAULT);

            setButtonDisabled(BUTTON_IDS.CUSTOMER_BTN, false);

            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_PACK
                ],
                true
            );

            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_ASAHI_ASDA,
                    BUTTON_IDS.CUSTOMER_ASAHI_MORRISONS,
                    BUTTON_IDS.CUSTOMER_ASAHI_SAINSBURYS
                ],
                false
            );
            break;

        case "customer-pack":
            setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, false);
            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_ASAHI_ASDA,
                    BUTTON_IDS.CUSTOMER_ASAHI_MORRISONS,
                    BUTTON_IDS.CUSTOMER_ASAHI_SAINSBURYS,
                    SPEC_IDS.SAINSBURYS,
                    SPEC_IDS.ASDA,
                    SPEC_IDS.MORRISONS
                ],
                true
            );

            setElementsHidden(
                [
                    BUTTON_IDS.CUSTOMER_PACK,
                    SPEC_IDS.PACK,
                ],
                false
            );

            break;

        case "customer-asahi-asda": // Decides what happens when Customer -> Asda is selected.
            updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.ASDA);
            setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, false);
            setElementsHidden(
                [
                    SPEC_IDS.PACK,
                    SPEC_IDS.SAINSBURYS,
                    SPEC_IDS.MORRISONS,
                ],
                true
            );

            setElementsHidden(
                [
                    SPEC_IDS.ASDA
                ],
                false
            );
            break;

        case "customer-asahi-morrisons": // Decides what happens when Customer -> Morrisons is selected.
            updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.MORRISONS);
            setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, false);

            setElementsHidden(
                [
                    SPEC_IDS.PACK,
                    SPEC_IDS.ASDA,
                    SPEC_IDS.SAINSBURYS,

                ],
                true
            );

            setElementsHidden(
                [
                    SPEC_IDS.MORRISONS
                ],
                false
            );
            break;

        case "customer-asahi-sainsburys": // Decides what happens when Customer -> Sainsbury's is selected.
            updateButtonText(BUTTON_IDS.CUSTOMER_BTN, BUTTON_TEXTS.CUSTOMER_BTN.SAINSBURYS);
            setButtonDisabled(BUTTON_IDS.FILMSPEC_BTN, false);

            setElementsHidden(
                [
                    SPEC_IDS.PACK,
                    SPEC_IDS.ASDA,
                    SPEC_IDS.MORRISONS

                ],
                true
            );

            setElementsHidden(
                [
                    SPEC_IDS.SAINSBURYS
                ],
                false
            );
            break;

        case "pack-15": // Decides what happens when Film Specificaton -> 15" x 15" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK15);
            processReadyConversion("#pack-15");
            break;

        case "pack-18": // Decides what happens when Film Specificaton -> 18" x 18" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK18);
            processReadyConversion("#pack-18");
            break;

        case "pack-20": // Decides what happens when Film Specificaton -> 20" x 20" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK20);
            processReadyConversion("#pack-20");
            break;

        case "pack-22": // Decides what happens when Film Specificaton -> 22" x 22" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK22);
            processReadyConversion("#pack-22");
            break;

        case "pack-24": // Decides what happens when Film Specificaton -> 24" x 24" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK24);
            processReadyConversion("#pack-24");
            break;


        case "pack-27": // Decides what happens when Film Specificaton -> 27" x 27" (Pack 4) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.PACK27);
            processReadyConversion("#pack-27");
            break;

        case "asahi-600": // Decides what happens when Film Specificaton -> 600" x 600" (Asahi) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.ASAHI600);
            processReadyConversion("#asahi-600");
            break;

        case "asahi-680": // Decides what happens when Film Specificaton -> 680" x 680" (Asahi) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.ASAHI680);
            processReadyConversion("#asahi-680");
            break;

        case "asahi-20": // Decides what happens when Film Specificaton -> 20" x 20" (Asahi) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.ASAHI20);
            processReadyConversion("#asahi-20");
            break;

        case "asahi-22": // Decides what happens when Film Specificaton -> 22" x 22" (Asahi) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.ASAHI22);
            processReadyConversion("#asahi-22");
            break;

        case "asahi-27": // Decides what happens when Film Specificaton -> 27" x 27" (Asahi) is selected.
            updateButtonText(BUTTON_IDS.FILMSPEC_BTN, BUTTON_TEXTS.FILM_SPECS.ASAHI27);
            processReadyConversion("#asahi-27");
            break;

        default:
            if (READY_CONVERSION_SETTINGS[key]) {
                readyConversion(READY_CONVERSION_SETTINGS[key]);
            } else {
                console.log("Error: No such case in 'buttonAction' Switch", key); // Error handling for unhandled cases.
            }
    }
}




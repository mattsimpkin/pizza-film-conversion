const build = 1.2;

let rollToleranceMin;  // Declare rollToleranceMin as a global variable to store the value of the lowest tolerance of film roll
let rollToleranceMax; // Declare rollToleranceMax as a global variable to store the value of the highest tolerance of film roll
let machineSetting;  // Declare machineSetting as a global variable to store the value of the machine setting for each spec (also the same value of what the film roll should measure)

let avgMeterWeight; // Declare avgMeterWeight as a global variable to store the average meter weight of roll.


// Function to calculate the average weight of the roll p/m
function avgWeightCalc() {
    let numOne = (rollToleranceMax - rollToleranceMin) / 2; // Finds the difference between rollToleranceMax and rollToleranceMin and halves it
    let numTwo = (rollToleranceMin + numOne).toFixed(4); // Adds the value from previous line to rollTolerancemin to find the middle between the two tolerances and sets the value to 4 decimal places

    avgMeterWeight = numTwo / machineSetting; // Divides the value of the previous line with the machineSetting variable to reach the final target
}

function readyConversion() {
    avgWeightCalc();
    $("#conversion-ctrl").prop("hidden", false); // Reveals the input and output fields

    readySpecificationMessage();

    // Event listener for changes in the input field
    $("#input-one").on("input", function () {
        inputConversion(); // Call inputTest function to update the output value when input changes
    });
}

function readySpecificationMessage() {
    $("#intro-text").prop("hidden", true); // Hides the intro text
    $("#spec-text").prop("hidden", false); // Reveals the Specification text
    $("#text-tol-min").text("Min tolerance: " + rollToleranceMin + "Kg");
    $("#text-tol-max").text("Max tolerance: " + rollToleranceMax + "Kg");
    $("#text-machineSetting").text("Machine Setting: " + machineSetting + "m");
    $("#text-weight-avg").text("Your average meter weight is: " + avgMeterWeight.toFixed(4) + "kg.");
}

// Function to update the output value
function inputConversion() {

    let numOne = parseFloat($("#input-one").val()); // Retrieve the value of the input field and convert it to a number
    let result = Math.round(numOne / avgMeterWeight);
    $("#output-one").val(result); // Set the text content of #output-one to the doubled value of numOne
    updateColor(result); // Update the color based on the new value
}


// Function to update the color of the output text
function updateColor(num) {
    let maxToleranceProduct = Math.round(rollToleranceMax / avgMeterWeight); // Calculates roll weight at max tolerance
    let minToleranceProduct = Math.round(rollToleranceMin / avgMeterWeight); // Calculates roll weight at min tolerance
    if (num > maxToleranceProduct || num < minToleranceProduct) {  // Compares if the the output figure fits between the min and max tolerance ranges
        $("#output-one").css("color", "red"); // Change the color of the output text to red
    } else {
        $("#output-one").css("color", "green"); // If the value isn't exceeded then the output text is defaulted to black
    }
}


// Initial update when the page loads
$(document).ready(function () {
    $("#customer-btn").prop("disabled", true); // Disables customer-btn untill a supplier has been specified using the supplier-btn
    $("#filmspec-btn").prop("disabled", true); // Disables the filmspec-btn untill a customer has been specified using the customer-btn
    $("#conversion-ctrl").prop("hidden", true); // Hides the input and output elements on page load
    $("#spec-text").prop("hidden", true); // Hides the film specification information on page load
    $("#build-num").text("Build: " + build); // Displays build number for version control

});


//EVENT HANDLERS

// Event Handler clicking supplier-btn (Specifically for when a change in supplier has been made)
$("#supplier-btn").on("click", function () {
    $("#customer-btn").text('Customer');  // Changes the customer-btn to Customer
    $("#filmspec-btn").text('Film Specification'); // Changes the filmspec-btn to Film Specification
    $("#filmspec-btn").prop("disabled", true); // Disables the filmspec-btn

});

// Event Handler clicking customer-btn
$("#customer-btn").on("click", function () {
    $("#filmspec-btn").text('Film Specification');

});

// Event handler for clicking on supplier-pack
$("#supplier-pack").on("click", function () {
    $("#supplier-btn").text('Packaging 4 Ltd');  // Changes the supplier-btn text to Packaging 4 Ltd
    $("#customer-btn").text('Packaging 4 Ltd Customers'); // Changes customer-btn text to Packaging 4 Ltd Customers
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#pack-15, #pack-18, #pack-20, #pack-22, #pack-24, #pack-27").prop("hidden", false); // Ensure the Packaging 4 Ltd Film Specs are visible
    $("#asda-600, #asda-680, #morrisons-22, #asahi-20, #asahi-27").prop("hidden", true); // Hides the Asahi / Marubeni film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled

});

// Event Handler for clicking on customer-pack
$("#customer-pack").on("click", function () {
    $("#customer-btn").text('Packaging 4 Ltd Customers'); // Changes customer-btn text to Packaging 4 Ltd Customers
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#pack-15, #pack-18, #pack-20, #pack-22, #pack-24, #pack-27").prop("hidden", false); // Ensure the Packaging 4 Ltd Film Specs are visible
    $("#asda-600, #asda-680, #morrisons-22, #asahi-20, #asahi-27").prop("hidden", true); // Hides the Asahi / Marubeni film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});


// Event handler for clicking on supplier-asahi
$("#supplier-asahi").on("click", function () {
    $("#supplier-btn").text('Marubeni (EU) GmbH'); // Changes supplier-btn text to "Marubeni (EU) GmbH"
    $("#customer-btn").prop("disabled", false); // Turns on the customer-btn
    $("#customer-asahi-asda, #customer-asahi-morrisons, #customer-asahi-sainsburys").prop("hidden", false); // Ensure the Asahi customers are visible
    $("#customer-pack").prop("hidden", true); // Hide the Packaging 4 Ltd option
    $("#customer-btn").prop("disabled", false); // Ensure the customer dropdown button is enabled
});



// Event Handler for clicking on customer-asahi-asda
$("#customer-asahi-asda").on("click", function () {
    $("#customer-btn").text('Bunzl Asda'); // Changes customer-btn text to Bunzl Asda
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#asda-600, #asda-680").prop("hidden", false); // Ensure the Bunzl Asda Film Specs are visible
    $("#pack-15, #pack-18, #pack-20, #pack-22, #pack-24, #pack-27, #morrisons-22, #asahi-20, #asahi-27").prop("hidden", true); // Hides all specs which aren't Bunzl Asda film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});

// Event Handler for clicking on customer-asahi-morrisons
$("#customer-asahi-morrisons").on("click", function () {
    $("#customer-btn").text('Bunzl Morrisons'); // Changes customer-btn text to Bunzl Morrisons
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#morrisons-22, #asahi-20, #asahi-27").prop("hidden", false); // Ensure the Bunzl Morrisons Film Specs are visible
    $("#pack-15, #pack-18, #pack-20, #pack-22, #pack-24, #pack-27, #asda-600, #asda-680").prop("hidden", true); // Hides all specs which aren't Bunzl Morrisons film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});

// Event Handler for clicking on customer-asahi-sainsburys
$("#customer-asahi-sainsburys").on("click", function () {
    $("#customer-btn").text("Bunzl Sainsbury's"); // Changes customer-btn text to Bunzl Sainsbury's
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#asahi-20, #asahi-27").prop("hidden", false); // Ensure the Bunzl Sainsbury's Specs are visible
    $("#pack-15, #pack-18, #pack-20, #pack-22, #pack-24, #pack-27, #asda-600, #asda-680, #morrisons-22").prop("hidden", true); // Hides all specs which aren't Bunzl Sainsbury's film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});


// Film Spec Event Handlers

// Packaging 4 Spec 15" x 15" (380mm)
$("#pack-15").on("click", function () {
    $("#filmspec-btn").text('15" ' + 'x' + ' 15" ' + '(380mm)'); // Changes filmspec-btn text to 15" x 15" (380mm)
    $("#spec-text").text('You have chosen: ' + '15" ' + 'x' + ' 15" ' + '(380mm)');
    rollToleranceMin = 1.9;
    rollToleranceMax = 2.2;
    machineSetting = 475;

    readyConversion();
});

// Packaging 4 Spec 18" x 18" (450mm)
$("#pack-18").on("click", function () {
    $("#filmspec-btn").text('18" ' + 'x' + ' 18" ' + '(450mm)'); // Changes filmspec-btn text to 18" x 18" (450mm)
    rollToleranceMin = 2.2;
    rollToleranceMax = 2.5;
    machineSetting = 450;

    readyConversion();
});

// Packaging 4 Spec 20" x 20" (500mm)
$("#pack-20").on("click", function () {
    $("#filmspec-btn").text('20" ' + 'x' + ' 20" ' + '(500mm)'); // Changes filmspec-btn text to 20" x 20" (500mm)
    rollToleranceMin = 2.3;
    rollToleranceMax = 2.6;
    machineSetting = 425;

    readyConversion();
});

// Packaging 4 Spec 22" x 22" (550mm)
$("#pack-22").on("click", function () {
    $("#filmspec-btn").text('22" ' + 'x' + ' 22" ' + '(550mm)'); // Changes filmspec-btn text to 22" x 22" (550mm)
    rollToleranceMin = 2.7;
    rollToleranceMax = 2.9;
    machineSetting = 440;

    readyConversion();
});

// Packaging 4 Spec 24" x 24" (600mm)
$("#pack-24").on("click", function () {
    $("#filmspec-btn").text('24" ' + 'x' + ' 24" ' + '(600mm)'); // Changes filmspec-btn text to 24" x 24" (600mm)
    rollToleranceMin = 2.9;
    rollToleranceMax = 3.2;
    machineSetting = 450;

    readyConversion();
});

// Packaging 4 Spec 27" x 27" (680mm)
$("#pack-27").on("click", function () {
    $("#filmspec-btn").text('27" ' + 'x' + ' 27" ' + '(680mm)'); // Changes filmspec-btn text to 27" x 27" (680mm)
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 400;

    readyConversion();
});

// Asahi Asda 600mm x 600mm
$("#asda-600").on("click", function () {
    $("#filmspec-btn").text('600mm x 600mm'); // Changes filmspec-btn text to 600mm x 600mm
    rollToleranceMin = 4.2;
    rollToleranceMax = 4.6;
    machineSetting = 666;

    readyConversion();
});

// Asahi Asda 680mm x 680mm
$("asda-680").on("click", function () {
    $("#filmspec-btn").text('680mm x 680mm'); // Changes filmspec-btn text to 680mm x 680mm
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 400;

    readyConversion();
});

// Asahi Bunzl Sainsburys 20" x 20" (500mm)
$("#asahi-20").on("click", function () {
    $("#filmspec-btn").text('20" ' + 'x' + ' 20" ' + '(500mm)'); // Changes filmspec-btn text to 20" x 20" (500mm)
    rollToleranceMin = 2.7;
    rollToleranceMax = 3.0;
    machineSetting = 500;

    readyConversion();
});

// Asahi Bunzle Morrisons 22" x 22" (550mm)
$("#morrisons-22").on("click", function () {
    $("#filmspec-btn").text('22" ' + 'x' + ' 22" ' + '(550mm)'); // Changes filmspec-btn text to 22" x 22" (550mm)
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 500;

    readyConversion();
});

// Asahi Spec for 27" x 27" (680mm) - Used for both Bunzl Sainsbury's and Bunzl Morrisons.
$("#asahi-27").on("click", function () {
    $("#filmspec-btn").text('27" ' + 'x' + ' 27" ' + '(680mm)'); // Changes filmspec-btn text to 27" x 27" (680mm)
    rollToleranceMin = 3.8;
    rollToleranceMax = 4.1;
    machineSetting = 500;

    readyConversion();
});






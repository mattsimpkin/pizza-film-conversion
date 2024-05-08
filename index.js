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

function paragraphTest() {
    avgWeightCalc();
    $("#spec-text").text("Min tolerance: " + rollToleranceMin + "kg. Max tolerance: " + rollToleranceMax + "kg. Machine Setting: " + machineSetting + "m. Your average meter weight is: " + avgMeterWeight + "kg.");

    // Event listener for changes in the input field
    $("#input-one").on("input", function () {
        inputConversion(); // Call inputTest function to update the output value when input changes
    });
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

    console.log("maxToleranceProduct: ", maxToleranceProduct);
    console.log("minToleranceProduct: ", minToleranceProduct);
}


// Initial update when the page loads
$(document).ready(function () {
    $("#customer-btn").prop("disabled", true); // Disables customer-btn untill a supplier has been specified using the supplier-btn
    $("#filmspec-btn").prop("disabled", true); // Disables the filmspec-btn untill a customer has been specified using the customer-btn
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
    $("#spec-pack-a, #spec-pack-b, #spec-pack-c, #spec-pack-d, #spec-pack-e, #spec-pack-f").prop("hidden", false); // Ensure the Packaging 4 Ltd Film Specs are visible
    $("#spec-asahi-asda-a, #spec-asahi-asda-b, #spec-asahi-sainsburys-a, #spec-asahi-a, #spec-asahi-morrisons-a").prop("hidden", true); // Hides the Asahi / Marubeni film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled

});

// Event handler for clicking on supplier-ashai
$("#supplier-ashai").on("click", function () {
    $("#supplier-btn").text('Asahi / Marubeni'); // Changes the supplier-btn text to Asahi / Marubeni

});

// Event handler for clicking on supplier-pack
$("#supplier-pack").on("click", function () {
    $("#supplier-btn").text('Packaging 4 Ltd'); // Changes supplier-btn text to Packaging 4 Ltd
    $("#customer-btn").prop("disabled", false); // Turns on the customer-btn
    $("#customer-asahi-asda, #customer-asahi-morrisons, #customer-asahi-sainsburys").prop("hidden", true);
    $("#customer-pack").prop("hidden", false); // Ensure the customer-pack option is visible
    $("#customer-btn").prop("disabled", false); // Ensure the customer dropdown button is enabled
});

// Event handler for clicking on supplier-ashai
$("#supplier-ashai").on("click", function () {
    $("#supplier-btn").text('Asahi / Marubeni'); // Changes supplier-btn text to Asahi / Marubeni
    $("#customer-btn").prop("disabled", false); // Turns on the customer-btn
    $("#customer-asahi-asda, #customer-asahi-morrisons, #customer-asahi-sainsburys").prop("hidden", false); // Ensure the Asahi customers are visible
    $("#customer-pack").prop("hidden", true); // Hide the Packaging 4 Ltd option
    $("#customer-btn").prop("disabled", false); // Ensure the customer dropdown button is enabled
});


// Event Handler for clicking on customer-pack
$("#customer-pack").on("click", function () {
    $("#customer-btn").text('Packaging 4 Ltd Customers'); // Changes customer-btn text to Packaging 4 Ltd Customers
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#spec-pack-a, #spec-pack-b, #spec-pack-c, #spec-pack-d, #spec-pack-e, #spec-pack-f").prop("hidden", false); // Ensure the Packaging 4 Ltd Film Specs are visible
    $("#spec-asahi-asda-a, #spec-asahi-asda-b, #spec-asahi-a, #spec-asahi-b, #spec-asahi-morrisons-a").prop("hidden", true); // Hides the Asahi / Marubeni film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});

// Event Handler for clicking on customer-asahi-asda
$("#customer-asahi-asda").on("click", function () {
    $("#customer-btn").text('Bunzl Asda'); // Changes customer-btn text to Bunzl Asda
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#spec-asahi-asda-a, #spec-asahi-asda-b").prop("hidden", false); // Ensure the Bunzl Asda Film Specs are visible
    $("#spec-pack-a, #spec-pack-b, #spec-pack-c, #spec-pack-d, #spec-pack-e, #spec-pack-f, #spec-asahi-a, #spec-asahi-b, #spec-asahi-morrisons-a").prop("hidden", true); // Hides all specs which aren't Bunzl Asda film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});

// Event Handler for clicking on customer-asahi-morrisons
$("#customer-asahi-morrisons").on("click", function () {
    $("#customer-btn").text('Bunzl Morrisons'); // Changes customer-btn text to Bunzl Morrisons
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#spec-asahi-a, #spec-asahi-morrisons-a, #spec-asahi-b").prop("hidden", false); // Ensure the Bunzl Morrisons Film Specs are visible
    $("#spec-pack-a, #spec-pack-b, #spec-pack-c, #spec-pack-d, #spec-pack-e, #spec-pack-f, #spec-asahi-asda-a, #spec-asahi-asda-b").prop("hidden", true); // Hides all specs which aren't Bunzl Morrisons film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});

// Event Handler for clicking on customer-asahi-sainsburys
$("#customer-asahi-sainsburys").on("click", function () {
    $("#customer-btn").text("Bunzl Sainsbury's"); // Changes customer-btn text to Bunzl Sainsbury's
    $("#filmspec-btn").prop("disabled", false); // Turns on the filmspec-btn
    $("#spec-asahi-a, #spec-asahi-b").prop("hidden", false); // Ensure the Bunzl Sainsbury's Specs are visible
    $("#spec-pack-a, #spec-pack-b, #spec-pack-c, #spec-pack-d, #spec-pack-e, #spec-pack-f, #spec-asahi-morrisons-a, #spec-asahi-asda-a, #spec-asahi-asda-b").prop("hidden", true); // Hides all specs which aren't Bunzl Sainsbury's film spec options
    $("#filmspec-btn").prop("disabled", false); // Ensure the Film Spec dropdown button is enabled
});


// Film Spec Event Handlers

// Packaging 4 Spec 15" x 15" (380mm)
$("#spec-pack-a").on("click", function () {
    $("#filmspec-btn").text('15" ' + 'x' + ' 15" ' + '(380mm)'); // Changes filmspec-btn text to 15" x 15" (380mm)
    $("#spec-text").text('You have chosen: ' + '15" ' + 'x' + ' 15" ' + '(380mm)');
    rollToleranceMin = 1.9;
    rollToleranceMax = 2.2;
    machineSetting = 475;

    paragraphTest();
});

// Packaging 4 Spec 18" x 18" (450mm)
$("#spec-pack-b").on("click", function () {
    $("#filmspec-btn").text('18" ' + 'x' + ' 18" ' + '(450mm)'); // Changes filmspec-btn text to 18" x 18" (450mm)
    rollToleranceMin = 2.2;
    rollToleranceMax = 2.5;
    machineSetting = 450;

    paragraphTest();
});

// Packaging 4 Spec 20" x 20" (500mm)
$("#spec-pack-c").on("click", function () {
    $("#filmspec-btn").text('20" ' + 'x' + ' 20" ' + '(500mm)'); // Changes filmspec-btn text to 20" x 20" (500mm)
    rollToleranceMin = 2.3;
    rollToleranceMax = 2.6;
    machineSetting = 425;

    paragraphTest();
});

// Packaging 4 Spec 22" x 22" (550mm)
$("#spec-pack-d").on("click", function () {
    $("#filmspec-btn").text('22" ' + 'x' + ' 22" ' + '(550mm)'); // Changes filmspec-btn text to 22" x 22" (550mm)
    rollToleranceMin = 2.7;
    rollToleranceMax = 2.9;
    machineSetting = 440;

    paragraphTest();
});

// Packaging 4 Spec 24" x 24" (600mm)
$("#spec-pack-e").on("click", function () {
    $("#filmspec-btn").text('24" ' + 'x' + ' 24" ' + '(600mm)'); // Changes filmspec-btn text to 24" x 24" (600mm)
    rollToleranceMin = 2.9;
    rollToleranceMax = 3.2;
    machineSetting = 450;

    paragraphTest();
});

// Packaging 4 Spec 27" x 27" (680mm)
$("#spec-pack-f").on("click", function () {
    $("#filmspec-btn").text('27" ' + 'x' + ' 27" ' + '(680mm)'); // Changes filmspec-btn text to 27" x 27" (680mm)
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 400;

    paragraphTest();
});

// Asahi Asda 600mm x 600mm
$("#spec-asahi-asda-a").on("click", function () {
    $("#filmspec-btn").text('600mm x 600mm'); // Changes filmspec-btn text to 600mm x 600mm
    rollToleranceMin = 4.2;
    rollToleranceMax = 4.6;
    machineSetting = 666;

    paragraphTest();
});

// Asahi Asda 680mm x 680mm
$("#spec-asahi-asda-b").on("click", function () {
    $("#filmspec-btn").text('680mm x 680mm'); // Changes filmspec-btn text to 680mm x 680mm
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 400;

    paragraphTest();
});

// Asahi Bunzl Sainsburys 20" x 20" (500mm)
$("#spec-asahi-sainsburys-a").on("click", function () {
    $("#filmspec-btn").text('20" ' + 'x' + ' 20" ' + '(500mm)'); // Changes filmspec-btn text to 20" x 20" (500mm)
    rollToleranceMin = 2.7;
    rollToleranceMax = 3.0;
    machineSetting = 500;

    paragraphTest();
});

// Asahi Bunzle Morrisons 22" x 22" (550mm)
$("#spec-asahi-morrisons-a").on("click", function () {
    $("#filmspec-btn").text('22" ' + 'x' + ' 22" ' + '(550mm)'); // Changes filmspec-btn text to 22" x 22" (550mm)
    rollToleranceMin = 3.0;
    rollToleranceMax = 3.3;
    machineSetting = 500;

    paragraphTest();
});

// Asahi Spec for 27" x 27" (680mm) - Used for both Bunzl Sainsbury's and Bunzl Morrisons.
$("#spec-asahi-a").on("click", function () {
    $("#filmspec-btn").text('27" ' + 'x' + ' 27" ' + '(680mm)'); // Changes filmspec-btn text to 27" x 27" (680mm)
    rollToleranceMin = 3.8;
    rollToleranceMax = 4.1;
    machineSetting = 500;

    paragraphTest();
});





// Event handler for clicking on customer dropdown button
// $("#customer-btn").on("click", function () {
//     let supplierText = $("#supplier-btn").text().trim();

//     // Check if the supplier is "Film Supplier"
//     if (supplierText === "Film Supplier") {
//         // Disable the customer dropdown
//         $(this).prop("disabled", true);
//     }
// });







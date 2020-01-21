/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
  
// by: Joe Turner
// Going for Exceeds!
// Rev 0: 1-20-2020 (peer review submission on Slack)


/*** Global Variabls ***/

// Form Selector
const form = document.querySelector('form');

// DOM selectors for Basic Info section
const basicInfo = form.firstElementChild;
const name = document.getElementById('name');
const email = document.getElementById('mail');

// DOM selector for "Design" Select element
const design = document.getElementById('design');

// DOM selectors for "Color" parent and children elements
const color = document.getElementById('color');
const colorOptions = color.children;
const colorDiv = document.getElementById('colors-js-puns');
const colorLabel = colorDiv.firstElementChild;

// DOM selectors for "Job Role"
const title = document.getElementById('title');
const otherTitle = document.getElementById('other-title');


// DOM selectors for "Activities" checkboxes
const activities = document.getElementsByClassName('activities')[0];
const activityOptions = document.querySelectorAll('.activities input');

// DOM selectors for "Payment Method"
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// DOM selectors for Form Validation
const register = document.getElementsByTagName('button')[0];

// Form Validation variables
let nameEventOnce = false;
let emailEventOnce = false;
let cardEventOnce = false;
let zipCodeEventOnce = false;
let cvvEventOnce = false;
const nameCheckArray = [/\w+/, /\w+/, 'Please enter a name', 'Please enter a name'];
const emailCheckArray = [/^[^@]+@[^@.]+\.[a-z]+$/i, /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter a valid email', 'Please enter a valid email'];
const cardCheckArray = [/\d{1}/, /^\d{13,16}$/, 'Please enter a credit card number', 'Please enter a number that is between 13 and 16 digits long'];
const zipCodeCheckArray = [/\d{1}/, /^\d{5}$/, 'Please enter a zip code', 'Please enter a number that is 6 digits long'];
const cvvCheckArray = [/\d{1}/, /^\d{3}$/, 'Please enter a cvv number', 'Please enter a number that is 3 digits long'];


// array of colors to display for "JS Puns" theme
const jsPuns_Colors = ['js puns', 'cornflowerblue', 'darkslategrey', 'gold'];
// array of colors to display for "I heart JS" theme
const iLoveJS_Colors = ['heart js', 'tomato', 'steelblue', 'dimgrey'];
const allColors = ['select theme', 'empty', 'cornflowerblue', 'darkslategrey', 'gold', 'tomato', 'steelblue', 'dimgrey'];


/*** Initialize Form and Tooltips at page load ***/
// creates empty Color option element
// creates Total Cost element
initializeForm = () => {
    
    // auto focus on Name field when page load
    name.focus();
 
    // initialize and create Color options (hidden at page load)
    if (design.value === 'Select Theme') {
        const emptyColorOption = document.createElement('option');
        emptyColorOption.value = 'empty';
        emptyColorOption.textContent = 'Please select a T-shirt theme';
        color.prepend(emptyColorOption);
        color.value = 'empty';
        colorLabel.style.display = 'none';
        color.style.display = 'none';
    }
    
    // hide Other Job Role text field at page load
    otherTitle.style.display = 'none';

    // initialize and create Total Cost Element
    const totalCost = document.createElement('p');
    totalCost.id = 'totalCost';
    totalCost.style.display = 'none';
    activities.append(totalCost);

    // show only Credit Card payment info at page load
    payment.value = 'credit card';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
};
initializeForm();

// creates Tooltip span elements
initializeTooltips = () => {
    createTooltips = (tooltipText, parent, target) => {
        const newToolTip = document.createElement('span');
        newToolTip.textContent = tooltipText;
        newToolTip.style.display = 'none';
        newToolTip.style.color = 'red';
        parent.insertBefore(newToolTip, target.previousElementSibling);
    };
    createTooltips2 = (tooltipText, parent) => {
        const newToolTip = document.createElement('span');
        newToolTip.textContent = tooltipText;
        newToolTip.style.display = 'none';
        newToolTip.style.color = 'red';
        parent.prepend(newToolTip);
    };

    createTooltips('Please enter a name', basicInfo, name);
    createTooltips('Please enter a valid email', basicInfo, mail);
    createTooltips('Please enter a credit card number', cardNumber.parentElement, cardNumber);
    createTooltips('Please enter a zip code', zipCode.parentElement, zipCode);
    createTooltips('Please enter a cvv number', cvv.parentElement, cvv);
    createTooltips2('Please select a payment method', payment.parentElement);
    createTooltips2('Please select an activity', activities);
};
initializeTooltips();


/*** display Color Options Function ***/
// argument passed in = array of colors to display for given Theme Selection
// loops through Colors and displays or hides Color options depending on Theme
createColorOptions = (themeColors) => {
   
    displayColors = () => {
        colorOptions[0].textContent = 'Please select a Color';
        for (let c = 0; c < colorOptions.length; c++) {
            colorOptions[c].style.display = 'none';
        }
        for (let i = 0; i < colorMatch.length; i++) {
            colorOptions[colorMatch[i]].style.display = '';
        }
    };

    const colorMatch = [];

    for (let c = 1; c < themeColors.length; c++) {
        for (let i = 0; i < colorOptions.length; i++) {
            if (themeColors[c] === colorOptions[i].value) {
                colorMatch.push(i);
            } 
        }
    }

    displayColors();
};

/*** update Checkbox States Function ***/
// argument passed is checkbox input object
// checks other Activities for conflicting date/time
// Activities with conflicting date/time are disabled
// if checkbox is cleared, conflicting Activities are re-enabled
checkBoxStates = (checkbox) => {
    const dateTime = checkbox.getAttribute('data-day-and-time');

    if (checkbox.checked === true) {
        for (let i = 0; i < activityOptions.length; i++) {
            let dateTime_toCheck = activityOptions[i].getAttribute('data-day-and-time');
            if (dateTime === dateTime_toCheck) {
                if (activityOptions[i].checked === false) {
                    activityOptions[i].disabled = true;
                }
            }
        }
    } else if (checkbox.checked === false) {
        for (let i = 0; i < activityOptions.length; i++) {
            let dateTime_toCheck = activityOptions[i].getAttribute('data-day-and-time');
            if (dateTime === dateTime_toCheck) {
                activityOptions[i].disabled = false; 
            }
        }
    }

    activitiesAreValid();
};

// checks for Activity Check Boxes
// returns valid or not
// shows or hides tool tip
activitiesAreValid = () => {
    let valid = false;
    for (let i = 0; i < activityOptions.length; i++) {
        if (activityOptions[i].checked === true) {
            valid = true;
        }
    }
    if (!valid) {
        showOrHideTip(true, activities.firstElementChild, activities);
    } else {
        showOrHideTip(false, activities.firstElementChild, activities);
    }

    return valid;
};

/*** update Total Cost ***/
// refreshes Total Cost based on which Activities are selected
updateCost = () => {
    let totalCost = 0;
    const total = document.getElementById('totalCost');

    for (let i = 0; i < activityOptions.length; i++) {
        let cost = parseInt(activityOptions[i].getAttribute('data-cost'));
        if (activityOptions[i].checked === true) {
            totalCost += cost;
        }
    }
    if (totalCost > 0) {
        total.style.display = '';
        total.textContent = 'Total: $' + totalCost;
    } else {
        total.style.display = 'none';
    }

};

/*** update Payment Info ***/
// display or hide info based on Payment Method
updatePayment = (method) =>  {
    
    showHidePayment = (cardDisp, paypalDisp, bitcoinDisp) => {
        creditCard.style.display = cardDisp;
        paypal.style.display = paypalDisp;
        bitcoin.style.display = bitcoinDisp;
    };
    
    const payTooltip = payment.parentElement.firstElementChild;
    let valid = true;

    // based on Payment Method selected
    // show/hide Payment Information
    if (method === 'select method') {
        showOrHideTip(true, payTooltip, payment);
        showHidePayment('none', 'none', 'none');
        valid = false;
    } else if (method === 'credit card') {
        showOrHideTip(false, payTooltip, payment);
        showHidePayment('', 'none', 'none');
        resetCardInfo();
    } else if (method === 'paypal') {
        showOrHideTip(false, payTooltip, payment);
        showHidePayment('none', '', 'none');
    } else if (method === 'bitcoin') {
        showOrHideTip(false, payTooltip, payment);
        showHidePayment('none', 'none', '');
    } 
    return valid;
};

/*** Reset Credit Card Info ***/
// blanks out Credit Card, Zip Code, and CVV
// changes Credit Card Info event listeners to 'blur' type
resetCardInfo = () => {
    cardNumber.value = '';
    showOrHideTip(false, cardNumber.previousElementSibling.previousElementSibling, cardNumber);
    changeToBlur(cardNumber, cardEvent);
    zipCode.value = '';
    showOrHideTip(false, zipCode.previousElementSibling.previousElementSibling, zipCode);
    changeToBlur(zipCode, zipCodeEvent);
    cvv.value = '';
    showOrHideTip(false, cvv.previousElementSibling.previousElementSibling, cvv);
    changeToBlur(cvv, cvvEvent);
};


/*** Form Validation Functions ***/

// show or hide tooltip span element
// depending on validity of input
showOrHideTip = (show, element, input) => {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = '';
      input.style.borderColor = 'red';
    } else {
      element.style.display = 'none';
      input.style.borderColor = '';
    }
};
 
// checks validity of Entered Value against Check Arrays
// returns "valid" boolean
// calls "changeToInput" 
validator = (target, inputArray, eventFunction) => {
    const entry = target.value;
    const RegEx_emptyCheck = inputArray[0];
    const RegEx_lengthCheck = inputArray[1];
    const tooltipText1 = inputArray[2];
    const tooltipText2 = inputArray[3];

    const notEmpty = RegEx_emptyCheck.test(entry);
    const lengthValid = RegEx_lengthCheck.test(entry);
    const tooltip = target.previousElementSibling.previousElementSibling;

    let valid = true; 

    if (!notEmpty) {
        tooltip.textContent = tooltipText1;
        valid = false;
    } else if (notEmpty && !lengthValid) {
        tooltip.textContent = tooltipText2;
        valid = false;
    } else {
        tooltip.textContent = '';
        valid = true;
    }

    showOrHideTip(!valid, tooltip, target);

    changeToInput(target, eventFunction);
    

    return valid;
};

// changes EventListener to "blur" type
changeToBlur = (target, eventFunction) => {
    target.removeEventListener('input', eventFunction);
    target.addEventListener('blur', eventFunction);
};

// changes EventListener to "input" type
changeToInput = (target, eventFunction) => {
    target.removeEventListener('blur', eventFunction);
    target.addEventListener('input', eventFunction);
};

// checks Validity of every User Input Field
formValidator = () => {
    const nameValid = validator(name, nameCheckArray, nameEvent);
    const emailValid = validator(email, emailCheckArray, emailEvent);
    const cardValid = validator(cardNumber, cardCheckArray, cardEvent);
    const zipCodeValid = validator(zipCode, zipCodeCheckArray, zipCodeEvent);
    const cvvValid = validator(cvv, cvvCheckArray, cvvEvent);
    activitiesAreValid();
    const activitiesValid = activitiesAreValid();
    const paymentValid = updatePayment();

    let valid = false;
        if (payment.value === 'credit card' && (nameValid && emailValid && cardValid && zipCodeValid && cvvValid && activitiesValid && paymentValid)) {
            valid = true;
        } else if (payment.value !== 'credit card' && (nameValid && emailValid && activitiesValid && paymentValid)) {
            valid = true;
        } else {
            valid = false;
        }
 
    return valid;
};


/*** Event Listeners ***/
// for Design drop-down
design.addEventListener('change', (event) => {
    
    color.selectedIndex = 0;
    
    if (event.target.value === 'js puns') {
        createColorOptions(jsPuns_Colors);
        colorLabel.style.display = '';
        color.style.display = '';
    } else if (event.target.value === 'heart js') {
        createColorOptions(iLoveJS_Colors);
        colorLabel.style.display = '';
        color.style.display = '';
    } else if (event.target.value === 'Select Theme') {
        colorOptions[0].textContent = 'Please select a T-shirt theme';
        console.log(colorLabel);
        colorLabel.style.display = 'none';
        color.style.display = 'none';
        //createColorOptions(allColors);
    }

});

// for Activities checkboxes
activities.addEventListener('change', (event) => {
    checkBoxStates(event.target);
    updateCost();
});

// for Payment Method drop-down
payment.addEventListener('change', (event) => {
    updatePayment(event.target.value);
});

// for Job Role drop-down
// if "Other" is selected, show Other Job Role text area 
title.addEventListener('change', (event) => {
    console.log(event.target.value);
    const role = event.target.value;
    if (role === 'other') {
        otherTitle.value = "Your Job Role";
        otherTitle.style.display = '';
    } else {
        otherTitle.style.display = 'none';
    }
});

// for Name input field
nameEvent = () => {
    validator(event.target, nameCheckArray, nameEvent);
};
name.addEventListener('blur', nameEvent);

// // for Email input field
emailEvent = () => {
    validator(event.target, emailCheckArray, emailEvent);
};
email.addEventListener('blur', emailEvent);


// for Credit Card Number input field
cardEvent = () => {
    validator(event.target, cardCheckArray, cardEvent);
};
cardNumber.addEventListener('blur', cardEvent);

// for Zip Code input field
zipCodeEvent = () => {
    validator(event.target, zipCodeCheckArray, zipCodeEvent);
};
zipCode.addEventListener('blur', zipCodeEvent);

// for CVV Number input field
cvvEvent = () => {
    validator(event.target, cvvCheckArray, cvvEvent);
};
cvv.addEventListener('blur', cvvEvent);

// for Register button
register.addEventListener('click', (event) => {
    const valid = formValidator();

    if (!valid) {
    event.preventDefault();
    } 
});
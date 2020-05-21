// form.js
const formId = "save-later-form"; // ID of the form
const url = location.href; //  href for the page
// const formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
const forms = [];
const saveButton = document.querySelector("#save"); // select save button
const alertBox = document.querySelector(".alert"); // select alert display div
// let form = document.querySelector(`#${formId}`); // select form
// let formElements = form.elements; // get the elements in the form


function collectForms(){
    $("form").each(function(e){
        formIdentifier = `${url} ${$(this).attr('id')}`;
        forms.push(formIdentifier);
    })
}
/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * @returns {Object}
 */
const getFormData = () => {
  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formIdentifier][element.name] = element.value;
    }
  }
  return data;
};



/**
 * This function displays a message
 * on the page for 1 second
 *
 * @param {String} message
 */
const displayAlert = message => {
  alertBox.innerText = message;
  alertBox.style.display = "block";
  setTimeout(function() {
    alertBox.style.display = "none";
  }, 1000);
};

/**
 * This function populates the form
 * with data from localStorage
 *
 */
const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
  }
};

document.addEventListener("DOMContentLoaded", function() {

    console.log('loaded');

    populateForm(); // populate the form when the document is loaded

    setInterval(function(){
        console.log('saving');
        forms.forEach(function(formIdentifier){
            data = getFormData();
            localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
            const message = "Form draft has been saved!";
            displayAlert(message);
        });
        
    
    }, 1000);

});
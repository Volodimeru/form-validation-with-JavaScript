const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const country = document.getElementById("country")
const countryError = document.querySelector("#country + span.error")
const ZIPField = document.getElementById("zipCode");
const ZIPFieldError = document.querySelector("#zipCode + span.error")
const password = document.querySelector("#password")
const passwordError = document.querySelector("#password +span.error")
const confirmPassword = document.querySelector("#confirmPassword")
const confirmPasswordError = document.querySelector("#confirmPassword +span.error")


const emailRegExp =
 
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//Mail
window.addEventListener("load", () => {
  const isValid = email.value.length  === 0 || emailRegExp.test(email.value)
  email.className = isValid ? "valid": "invalid"
});

email.addEventListener("input", () => {
  const isValid = email.value.length !== 0 || emailRegExp.test(email.value)
  if (isValid) {
    email.className = "valid";
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    email.className = "invalid";
  }
})

form.addEventListener("submit", (event) => {
  
  
  const isValid = email.value.length !== 0 && emailRegExp.test(email.value);
  if (!isValid) {
    email.className = "invalid";
    emailError.textContent = "Please enter email";
    emailError.className = "error active";
    event.preventDefault();
  } else {
    email.className = "valid";
    emailError.textContent = "";
    emailError.className = "error";
  }
})

//Country
function countryListCheck() {
  const countryLIst = ['France',"Georgia","Netherland","Greece"]
  if (countryLIst.includes(country.value )) {
    return true
  }else {
    return false
  }
}

window.addEventListener("load", () => {
  const isValid = country.value.length  === 0 || countryListCheck()
  country.className = isValid ? "valid": "invalid"
});

country.addEventListener("input", () => {
  const isValid = country.value.length !== 0 || countryListCheck()
  if (isValid) {
    country.className = "valid";
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    country.className = "invalid";
  }
})

form.addEventListener("submit", (event) => {
  
  
  const isValid = country.value.length !== 0 && countryListCheck()
  if (!isValid) {
    country.className = "invalid";
    countryError.textContent = "Please select country";
    countryError.className = "error active";
    event.preventDefault();
  } else {
    country.className = "valid";
    countryError.textContent = "";
    countryError.className = "error";

  }
})

//ZIP
function checkZIP() {
  if (countryListCheck()) {
  const constraints = {
    Greece: [
      "^\\d{5}$",
      "Greece ZIPs must have exactly 5 digits",
    ],
    France: [
      "^\\d{5}$",
      "France ZIPs must have exactly 5 digits",
    ],
    Georgia: [
      "^\\d{4}$",
      "Georgia ZIPs must have exactly 4 digits",
    ],
    Netherland: [
      "^\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"
    ],
  };
  const constraint = new RegExp(constraints[country.value][0], "");

// Check it!
if (constraint.test(ZIPField.value)) {
  // The ZIP follows the constraint, we use the ConstraintAPI to tell it
  return true
} else {
  // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
  // give a message about the format required for this country
  ZIPFieldError.textContent = constraints[country.value][1]
  ZIPFieldError.className = "error active";
  
  return false
}}else {
  ZIPFieldError.textContent = "Please select Country first";
  ZIPFieldError.className = "error active";
  }
}

window.onload = () => {
  document.getElementById("zipCode").oninput = checkZIP;

  document.getElementById("country").onchange = checkZIP;
}

window.addEventListener("load", () => {
  const isValid = ZIPField.value.length  === 0 || checkZIP()
  ZIPField.className = isValid ? "valid": "invalid"
});

ZIPField.addEventListener("input", () => {
  const isValid = ZIPField.value.length !== 0 || checkZIP()
  if (isValid) {
    ZIPField.className = "valid";
    ZIPFieldError.textContent = "";
    ZIPFieldError.className = "error";
  } else {
    ZIPField.className = "invalid";
  }
})

form.addEventListener("submit", (event) => {
  
  
  if (ZIPField.value.length === 0) {
    ZIPField.className = "invalid";
    ZIPFieldError.textContent = "Please enter ZIP  Code";
    ZIPFieldError.className = "error active";
    event.preventDefault();
  } else if (!checkZIP() ) {
    ZIPField.className = "invalid";
    ZIPFieldError.textContent = "Please enter  valid ZIP  Code";
    ZIPFieldError.className = "error active";
    event.preventDefault();
  }else {
    ZIPField.className = "valid";
    ZIPFieldError.textContent = "";
    ZIPFieldError.className = "error";
  }
})

//Password
const passWordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

window.addEventListener("load", () => {
  const isValid = password.value.length  === 0 || passWordRegExp.test(password.value)
  password.className = isValid ? "valid": "invalid"
});


password.addEventListener("input", () => {
  const isValid = password.value.length !== 0 || passWordRegExp.test(password.value)
  if (isValid) {
    password.className = "valid";
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    password.className = "invalid";
  }
})

form.addEventListener("submit", (event) => {
  
  
  if (password.value.length === 0) {
    password.className = "invalid";
    passwordError.textContent = "Please enter password";
    passwordError.className = "error active";
    event.preventDefault();
  } else if (!passWordRegExp.test(password.value) ) {
    password.className = "invalid";
    passwordError.textContent = "Please use at least 1: upper case letter, lowercase letter, number and symbol. Make it  minimum 8 characters long";
    passwordError.className = "error active";
    event.preventDefault();
  }else {
    password.className = "valid";
    passwordError.textContent = "";
    passwordError.className = "error";
  }
})

//ConfirmPassword
confirmPassword.addEventListener("input", () => {
  const isValid = confirmPassword.value.length !== 0 || confirmPassword.value === password.value
  if (isValid) {
    confirmPassword.className = "valid";
    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "error";
  } else {
    confirmPassword.className = "invalid";
  }
})

form.addEventListener("submit", (event) => {
  
  
  if (confirmPassword.value.length === 0) {
    event.preventDefault();
    confirmPassword.className = "invalid";
    confirmPasswordError.textContent = "Please confirm password";
    confirmPasswordError.className = "error active";
  } else if (confirmPassword.value !== password.value) {
    event.preventDefault();
    confirmPassword.className = "invalid";
    confirmPasswordError.textContent = "Passwords didn't match";
    confirmPasswordError.className = "error active";
  }else {
    confirmPassword.className = "valid";
    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "error";
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault()
  form.style.display = "none"
  const confirmationMessage = document.createElement("p");
  confirmationMessage.textContent = "Form submitted successfully!";
  document.body.appendChild(confirmationMessage);
})



// email.addEventListener("input", (event) => {

//     if (email.validity.valid) {
//       // In case there is an error message visible, if the field
//       // is valid, we remove the error message.
//       emailError.textContent = ""; // Reset the content of the message
//       emailError.className = "error";} // Reset the visual state of the message
//     // } else {
//     //   // If there is still an error, show the correct error
//     //   showEmailError();
//     // }
//   })

//   country.addEventListener("input", (event) => {
//     if (country.validity.valid) {
//       countryError.textContent = ""; // Reset the content of the message
//       countryError.className = "error"; // Reset the visual state of the message
//     }
      
    

    
    
//     // else {
//     //   showCountryError();
//     // }
//   })

// function showEmailError() {
//   if (email.validity.valueMissing) {
//     emailError.textContent = "You need to enter an email address.";
//   } else if (email.validity.typeMismatch) {
//     emailError.textContent = "Please enter valid email address.";
//   } 
//   emailError.className = "error active";
// }


// function showCountryError() {
//   if (country.validity.valueMissing) {
//     countryError.textContent = "You need to choose the Country.";
//   } else if (!countryListCheck()) {
//     countryError.textContent = "You need to choose from Countries listed here.";
//   }
// }




// ZIPField.addEventListener("input", (event) => {
//   if (ZIPField.validity.valid) {
//   // In case there is an error message visible, if the field
//   // is valid, we remove the error message.
//   ZIPFieldError.textContent = ""; // Reset the content of the message
//   ZIPFieldError.className = "error"; // Reset the visual state of the message
// } 
// // else {
// //   // If there is still an error, show the correct error
// //   showZIPError();

// })

//   // if (email.validity.valid) {
//   //   // In case there is an error message visible, if the field
//   //   // is valid, we remove the error message.
//   //   emailError.textContent = ""; // Reset the content of the message
//   //   emailError.className = "error"; // Reset the visual state of the message
//   // } else {
//   //   // If there is still an error, show the correct error
//   //   // showEmailError();
//   // }

// function showZIPError() {
//   if (ZIPField.validity.valueMissing) {
//     // If the field is empty,
//     // display the following error message.
//     ZIPFieldError.textContent = "You need to enter ZIP Code.";
//   } else if (!countryListCheck()) {
//     // If the field doesn't contain an email address,
//     // display the following error message.
//     ZIPFieldError.textContent = "Please select the country first"
// }
// }









// function countryListCheck() {
//   const countryLIst = ['France',"Georgia","Netherland","Greece"]
//   if (countryLIst.includes(country.value )) {
//     return true
//   }else {
//     return false
//   }
// }
  



// function checkZIP() {
//   if (countryListCheck()) {
//   const constraints = {
//     Greece: [
//       "^\\d{5}$",
//       "Greece ZIPs must have exactly 5 digits",
//     ],
//     France: [
//       "^\\d{5}$",
//       "France ZIPs must have exactly 5 digits",
//     ],
//     Georgia: [
//       "^\\d{4}$",
//       "Georgia ZIPs must have exactly 4 digits",
//     ],
//     Netherlands: [
//       "^\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
//       "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"
//     ],
//   };
//   const constraint = new RegExp(constraints[country.value][0], "");

// // Check it!
// if (constraint.test(ZIPField.value)) {
//   // The ZIP follows the constraint, we use the ConstraintAPI to tell it
//   ZIPFieldError.textContent = ""
// } else {
//   // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
//   // give a message about the format required for this country
//   ZIPFieldError.textContent = constraints[country.value][1]
// }}}

//   window.onload = () => {
//     document.getElementById("zipCode").oninput = checkZIP;

//     document.getElementById("country").onchange = checkZIP;
//   }



//   form.addEventListener("submit", (event) => {
   
//     // if the email field is valid, we let the form submit
//     if (!email.validity.valid) {
//       showEmailError();
//       event.preventDefault();
//     }
//     if (!country.validity.valid) {
//       showCountryError();
//       event.preventDefault();
//     }
//     if (!ZIPField.validity.valid) {
//       showZIPError();
//       event.preventDefault();
//       }
//     })
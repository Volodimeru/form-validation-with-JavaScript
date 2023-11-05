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

//Mail validation
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



//Country validation
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



//ZIP validation
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


//Password validation
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


//ConfirmPassword validation
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


// Form validation on submit
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
  
  const isValids = country.value.length !== 0 && countryListCheck()
  if (!isValids) {
    country.className = "invalid";
    countryError.textContent = "Please select country";
    countryError.className = "error active";
    event.preventDefault();
  } else {
    country.className = "valid";
    countryError.textContent = "";
    countryError.className = "error";
  }
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
    event.preventDefault();                                                  // needs to be deleted if submit needed
    confirmPassword.className = "valid";
    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "error";
    form.style.display = "none"
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "Form submitted successfully!";
    document.body.appendChild(confirmationMessage);
  }
})
form.addEventListener("reset", ()=> {
  confirmPasswordError.textContent = "";
  confirmPasswordError.className = "error";
  passwordError.textContent = "";
  passwordError.className = "error";
  countryError.textContent = "";
  countryError.className = "error";
  ZIPFieldError.textContent = "";
  ZIPFieldError.className = "error";
  emailError.textContent = "";
  emailError.className = "error";
})

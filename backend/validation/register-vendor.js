const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInputVendor(data) {

    let errors = {}; 
    
    // Convert empty fields to an empty string so we can use validator functions
    
    data.managerName = !isEmpty(data.managerName) ? data.managerName : "";
    data.shopName = !isEmpty(data.shopName) ? data.shopName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.openTime = !isEmpty(data.openTime) ? data.openTime : "";
    data.closeTime = !isEmpty(data.closeTime) ? data.closeTime : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";// Name checks
    
    // Manager name check
    if (Validator.isEmpty(data.managerName)) {
      errors.managerName = "Manager Name field is required";
    }

    // Shop name check
    if (Validator.isEmpty(data.shopName)) {
        errors.shopName = "Shop Name field is required";
      }
    
    // // Email checks
    // if (Validator.isEmpty(data.email)) {
    //   errors.email = "Email field is required";
    // } 
    // else if (!Validator.isEmail(data.email)) {
    //   errors.email = "Email is invalid";
    // }
  
    // Contact number check
    if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact field is required";
    }
    else if (!data.contact.match("[0-9]{10}")) {
    errors.contact = "Contact Number must contain 10 digits";
    }
    
    // Open and Close Time check
    if (Validator.isEmpty(data.openTime)) {
        errors.openTime = "Opening Time field is required";
    }

    if (Validator.isEmpty(data.closeTime)) {
        errors.closeTime = "Closing Time field is required";
    }
    else if (data.openTime > data.closeTime){
        errors.closeTime = "Closing Time cannot be before Opening Time";
    }

    // // Password checks
    // if (Validator.isEmpty(data.password)) {
    //   errors.password = "Password field is required";
    // }
    
    // if (Validator.isEmpty(data.password2)) {
    //   errors.password2 = "Confirm password field is required";
    // }
    
    // if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    //   errors.password = "Password must be at least 6 characters";
    // }
    
    // if (!Validator.equals(data.password, data.password2)) {
    //   errors.password2 = "Passwords must match";
    // }
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
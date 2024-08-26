import validator from "validator";

export const validate = (email, username, password, cpassword) => {
  let validationErrors = {};

  if (!validator.isEmail(email) || "") {
    validationErrors.email = "Email is required";
  }

  if (validator.isEmpty(username)) {
    validationErrors.username = "Username is required";
  }

  if (!validator.isStrongPassword(password, { minLength: 8 })) {
    validationErrors.password = "This Password is Weak";
  }

  if (password !== cpassword) {
    validationErrors.cpassword = "Passwords do not match";
  }

  return validationErrors? validationErrors:true;
};
export function isCookieSet() {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("token"));
}

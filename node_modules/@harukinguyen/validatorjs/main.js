export default function Validator(elements) {
  const invalidInfos = {};
  elements.forEach(element => {
    const invalidInfo = {};

    // Validate with each type of input
    if (element) {
      if (element.hasAttribute('validate-required')) {
        invalidInfo.fill = isFill(element);
      }
      if (element.hasAttribute('s-username')) {
        invalidInfo.username = isUsername(element);
      }
      if (element.hasAttribute('email')) {
        invalidInfo.email = isEmail(element, true);
      }
      if (element.hasAttribute('s-password')) {
        invalidInfo.password = isPwd(element);
      }
      if (element.hasAttribute('confirm')) {
        const sPwdElm = document.querySelector('#s-pwd');
        invalidInfo.confirm = isConfirm(element, sPwdElm);
      }
      if (element.hasAttribute('l-username')) {
        invalidInfo.lUsername = isLUsername(element, 'username');
      }
      if (element.hasAttribute('l-password')) {
        invalidInfo.lPassword = isLPwd(element, 'password');
      }
    } else {
      console.error(
        'You must include a selector for the Validator function to run'
      );
    }

    invalidInfos[element.id] = invalidInfo;
  });

  // Check if is there any invalid condition in each input?
  const validArr = [];
  Object.entries(invalidInfos).forEach(([, values]) => {
    Object.entries(values).forEach(([, value]) => {
      validArr.push(value);
    });
  });
  const isValid = validArr.every(value => {
    return value;
  });

  return [isValid, invalidInfos];
}

function isUsername(selector) {
  const value = selector.value;
  /**
   * REGEX EXPLAIN
   * Username is from 8-16 character.
   * Username only contains characters and numbers.
   */
  const regex = /^([a-zA-Z0-9]){7,17}[^\s]$/;
  const isMatch = regex.test(value);
  const isValid = isMatch ? true : false;
  return isValid;
}

function isFill(selector) {
  const value = selector.value;
  const isValid = value ? true : false;
  return isValid;
}

function isEmail(selector, optional) {
  const value = selector.value;

  function validate() {
    // Regex source: https://www.w3resource.com/javascript/form/email-validation.php
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isMatch = regex.test(value);
    const isValid = isMatch ? true : false;
    return isValid;
  }

  // Because the email is optional, so we only check if the input have value
  if (optional === true) {
    if (value) {
      return validate();
    } else {
      return true;
    }
  } else {
    return validate();
  }
}

function isPwd(selector) {
  const value = selector.value;
  // ^                 start-of-string
  // (?=.*[0-9])       a digit must occur at least once
  // (?=.*[a-z])       a lower case letter must occur at least once
  // (?=.*[A-Z])       an upper case letter must occur at least once
  // (?=.*[@#$%^&+=])  a special character must occur at least once
  // (?=\S+$)          no whitespace allowed in the entire string
  // .{8,}             anything, at least eight places though
  // $                 end-of-string

  const regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.])(?=\S+$).{8,}$/;
  const isMatch = regex.test(value);
  const isValid = isMatch ? true : false;
  return isValid;
}

function isConfirm(selector, sPwdElm) {
  const value = selector.value;
  const pwd = sPwdElm.value;

  let isValid;
  // When user yet enter the input in the password field, the confirm pwd will still valid
  // So we have to make sure it's only valid when value was entered
  if (value) {
    isValid = value === pwd ? true : false;
  } else {
    isValid = false;
  }

  return isValid;
}

function isLUsername(selector, username) {
  const isValid = selector.value === username ? true : false;
  return isValid;
}

function isLPwd(selector, pwd) {
  const isValid = selector.value === pwd ? true : false;
  return isValid;
}

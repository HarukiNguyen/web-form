export default function handleInvalid(key, value) {
  // Get input and it's input group for validating
  const element = document.querySelector(`#${key}`);
  const formControlParent = element.parentElement;

  // Function for handle display wrong input messages.
  function displayMsg(type, value, parent, msg) {
    const span = parent.querySelector('.invalid-msg');
    if (!value[type]) {
      // Handle when invalid
      // Only add message when span element doesn't exist
      if (!span) {
        const span = document.createElement('span');
        parent.appendChild(span);
        span.textContent = msg;
        span.classList.add('invalid-msg');
        element.classList.add('invalid');
      }
      // Remove message when valid
    } else if (value[type]) {
      // If span exist -> remove message
      if (span) {
        parent.removeChild(span);
        if (element.classList.contains('invalid')) {
          element.classList.remove('invalid');
        }
      }
    }
  }

  // Because it is general, so we will handle required input first
  if (formControlParent) {
    if (element.hasAttribute('validateRequired')) {
      displayMsg('fill', value, formControlParent, 'You must fill this field');
    }
    // Display specify message for each input
    switch (key) {
      case 's-username': {
        displayMsg(
          'username',
          value,
          formControlParent,
          'Your username must be between 8-16 characters, no white space, only have letters and numbers'
        );
        break;
      }
      case 'email': {
        displayMsg(
          'email',
          value,
          formControlParent,
          'This field have to be an email'
        );
        break;
      }
      case 's-pwd': {
        displayMsg(
          'password',
          value,
          formControlParent,
          'Your password must at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
        );
        break;
      }
      case 'pwd-confirm': {
        displayMsg(
          'confirm',
          value,
          formControlParent,
          'Please make sure your password match'
        );
        break;
      }
      case 'l-username': {
        displayMsg('lUsername', value, formControlParent, 'Invalid username');
        break;
      }
      case 'l-pwd': {
        displayMsg('lPassword', value, formControlParent, 'Invalid password');
        break;
      }
    }
  } else {
    console.error("Can't find form control's parent");
  }
}

import handleInvalid from '../handleValidation/handleInvalid.js';
import handleValid from '../handleValidation/handleValid.js';
import Validator from '../Validator.js';

export default function handleInput(inputDisplayList) {
  inputDisplayList.forEach(element => {
    if (element) {
      // When the user was entering the input, there's no message.
      element.addEventListener('input', e => {
        const input = e.target;
        const parentElement = input.parentElement;
        const message = parentElement.querySelector('.invalid-msg');

        // Remove error message.
        if (message) {
          message.remove();
        }
        if (element.classList.contains('invalid')) {
          element.classList.remove('invalid');
        }
      });

      // Blur from the input
      element.addEventListener('blur', () => {
        Object.entries(Validator(inputDisplayList)[1]).forEach(
          ([selector, value]) => {
            // Condition for check if either an element is on blur or other element
            if (element.id === selector) {
              const isValid = Object.entries(value).every(([, value]) => {
                return value;
              });

              // When valid
              if (isValid) {
                handleValid(selector);
              } else {
                // When invalid
                handleInvalid(selector, value);
              }
            }
          }
        );
      });
    } else {
      console.error(`Can't find an input for validating, please check again.`);
    }
  });
}

import handleAni from './handleAnimaiton/handleAni.js';
import getInputDisplayList from './handleInput/getInputDisplayList.js';
import handleInput from './handleInput/handleInput.js';
import handleInvalid from './handleValidation/handleInvalid.js';
import Validator from './Validator.js';

const signupForm = document.querySelector('.form.signup');
const loginForm = document.querySelector('.form.login');
const redirectPopup = document.querySelector('.redirect-popup');

if (signupForm && loginForm) {
  // Variables for animation calculation
  const slideOutRlDelay = 0.9;
  const fadeOutDelay = 1.5;
  const slideOutRlAni = `slideOutRl ${slideOutRlDelay}s ease-in forwards`;
  const fadeOutAni = `fadeOut ${fadeOutDelay}s ease-in forwards`;

  const windowWidth = window.innerWidth;
  // The break point that new animation was applied to >= 400px screen.
  const aniResPoint = 400;

  // Handle validation
  // Input element of signup form
  const sUsername = signupForm.querySelector('#s-username');
  const email = signupForm.querySelector('#email');
  const sPwd = signupForm.querySelector('#s-pwd');
  const pwdConfirm = signupForm.querySelector('#pwd-confirm');

  // Input element of login form
  const lUsername = loginForm.querySelector('#l-username');
  const lPwd = loginForm.querySelector('#l-pwd');

  // Get a input list for validate when the form's display property isn't none.
  const inputList = [sUsername, email, sPwd, pwdConfirm, lUsername, lPwd];
  const inputDisplayList = [];

  // Initial run
  getInputDisplayList(inputDisplayList, inputList);
  // Handle when user entering the input or blur.
  handleInput(inputDisplayList);

  // Handle when submit the signup form.
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    // Get the input list when the login form's animation finish
    // Run the handle input when log in form's animation finish
    setTimeout(() => {
      getInputDisplayList(inputDisplayList, inputList);
      handleInput(inputDisplayList);
    }, fadeOutDelay * 1000);

    if (!Validator(inputDisplayList)[0]) {
      // Handle wrong input
      Object.entries(Validator(inputDisplayList)[1]).forEach(([key, value]) => {
        handleInvalid(key, value);
      });
    } else {
      console.warn('You need some other ways to handle the submitting data.');
      handleAni(
        windowWidth,
        aniResPoint,
        signupForm,
        fadeOutAni,
        slideOutRlAni,
        loginForm,
        fadeOutDelay,
        slideOutRlDelay
      );
    }
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!Validator(inputDisplayList)[0]) {
      // Handle input mistakes
      Object.entries(Validator(inputDisplayList)[1]).forEach(([key, value]) => {
        handleInvalid(key, value);
      });
    } else {
      console.warn('You need some other ways to handle the submitting data.');
      if (redirectPopup) {
        handleAni(
          windowWidth,
          aniResPoint,
          loginForm,
          fadeOutAni,
          slideOutRlAni,
          redirectPopup,
          fadeOutDelay,
          slideOutRlDelay
        );
      } else {
        console.error("Can't find redirectPopup element");
      }
    }
  });
} else {
  console.error("Can't find the signup form and the login form");
}

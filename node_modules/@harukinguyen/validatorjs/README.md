# ValidatorJS

## ⚠️ This project is under development

## Installation

With **npm**.

```bash
npm i @harukinguyen/validatorjs
```

With **yarn**.

```bash
yarn add @harukinguyen/validatorjs
```

With **pnpm**.

```bash
pnpm i @harukinguyen/validatorjs
```

## Usage

### HTML

First, you will need to setup your form controls in your HTML.

**Currently**, the library provides these HTML attributes to mark the input for what to validate.

- `validate-required`: input need to be fill.
- `s-username`: username for signup form.
- `s-password`: password for signup form.
- `email`: email.
- `confirm`: use for confirm password (need to have password input, and the password input must have `id="s-pwd"`)

⚠️ **Validate logic for loging will be update soon**

- `l-username`: username for login form.
- `l-password`: password for login form.

**Example**:

```HTML
<input
  type="text"
  placeholder="Enter your username..."
  id="s-username"
  validate-required
  s-username
/>
<input
  type="password"
  id="s-pwd"
  placeholder="Enter password..."
  validate-required
  s-password
/>
<input
  type="password"
  placeholder="Enter your password again..."
  id="pwd-confirm"
  validate-required
  confirm
/>
```

### Javascript

Just call the function with the list of elements, it will return an array with 2 elements.

The fist element is a boolean that say if all of these elements are valid or not.

The second element is an array of objects, each object contain information about the validation of the input.

**Example**:

_With `main.js` and `node_modules` in root directory_.

```javascript
@import Validator from './node_modules/@harukinguyen/validatorjs/main.js';

const validateInformation = Validator(listOfElement);

console.log(validateInformation);

/*
 * Example result:
 * Signup validation information:
 * {
 *  true,
 *  {
 *    email: {email: true}
 *    s-username:{fill: true, username: true}
 *    s-pwd: {fill: true, password: true}
 *    pwd-confirm: {fill: false, confirm: false}
 *  }
 * }
 * Login validation information:
 * {
 *  true,
 *  {
 *    l-username:{fill: true, lUsername: true}
 *    l-pwd:{fill: true, lPassword: false}
 *  }
 * }
**/
```

Explan about the 2nd element of the `validateInformation`:

- Property is the id of an element (**so your must have id for each element to ensure the library work correctly**).
- Value is an object, which:
  - `fill`: input is fill or not.
  - `email`: validation of email input.
  - `password`: validation of password input.
  - `confirm`: validation of password confirm.
  - `l-username`: validation of login username.
  - `l-pwd`: validation of login password.

You can use these result to hanlde how the form should "react".

## ✅ Todo

- [x] Complete docs.
- [ ] Make the package dynamically importable.
- [ ] Add logic for handle login form.

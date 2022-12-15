// Function to get the input list when needed.
export default function getInputDisplayList(inputDisplayList, inputList) {
  // clean the list
  inputDisplayList.splice(0, inputDisplayList.length);

  inputList.forEach(elm => {
    const formParent = elm.closest('form');
    const formDisplayProp = window
      .getComputedStyle(formParent)
      .getPropertyValue('display');

    // clear the array

    if (formDisplayProp !== 'none') {
      inputDisplayList.push(elm);
    }
  });
}

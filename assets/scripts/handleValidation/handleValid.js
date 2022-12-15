export default function handleValid(key) {
  const element = document.querySelector(`#${key}`);
  element.classList.add('valid');
}

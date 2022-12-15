export default function applyFormAnimation(
  hiddingForm,
  hiddingAni,
  showingForm,
  delay
) {
  hiddingForm.style.animation = hiddingAni;
  setTimeout(() => {
    hiddingForm.style.display = 'none';
    showingForm.style.display = 'block';
  }, delay);
}

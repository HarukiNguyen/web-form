import applyFormAnimation from './applyFormAnimation.js';

export default function handleAni(
  windowWidth,
  aniResPoint,
  hiddingForm,
  mobileAni,
  largeScreenAni,
  showingForm,
  mobileDelay,
  largeScreenDelay
) {
  if (windowWidth < aniResPoint) {
    // Animation for screen < 400px
    applyFormAnimation(hiddingForm, mobileAni, showingForm, mobileDelay * 1000);
  } else {
    // Animation for screen >= 400px
    applyFormAnimation(
      hiddingForm,
      largeScreenAni,
      showingForm,
      largeScreenDelay * 1000
    );
  }
}

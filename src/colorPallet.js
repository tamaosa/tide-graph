const ROOT = document.documentElement;
const colorPallet = {
  main: getComputedStyle(ROOT)
    .getPropertyValue("--main-color")
    .trim(),
  dark: getComputedStyle(ROOT)
    .getPropertyValue("--dark-color")
    .trim(),
  txt: getComputedStyle(ROOT)
    .getPropertyValue("--txt-color")
    .trim(),
  theme: getComputedStyle(ROOT)
    .getPropertyValue("--theme-color")
    .trim(),
  accent: getComputedStyle(ROOT)
    .getPropertyValue("--accent-color")
    .trim()
};

export default colorPallet;

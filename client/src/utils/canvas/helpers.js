export const hideElement = element => {
  element.style.display = "none";
};

export const showElement = element => {
  element.style.display = "block";
};

export const getDist = (x1, x2) => {
  return Math.abs(x1 - x2);
};

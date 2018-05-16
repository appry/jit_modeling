export const hideElement = element => {
  element.style.display = "none";
};

export const showElement = element => {
  element.style.display = "block";
};

export const getDist = (x1, x2) => {
  return Math.abs(x1 - x2);
};

export const getNormalPos = pos => {
  if (pos.x < 0) pos.x = 0;
  if (pos.y < 0) pos.y = 0;
  if (pos.x > 2000) pos.x = 2000;
  if (pos.y > 2000) pos.y = 2000;
  return pos;
};

const initialState = {
  fontSize: "16",
  fontFamily: "Arial",
  fillStyle: "white",
  strokeStyle: "black",
  textBaseline: "top",
  size: 30,
  width: 30,
  height: 60,
  gridNodeSize: 15
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

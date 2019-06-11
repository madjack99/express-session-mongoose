const initialState = {
  loggedUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        loggedUser: action.payload
      };
    case "REMOVE_USER":
      return {
        ...state,
        loggedUser: null
      };
    default:
      return state;
  }
}

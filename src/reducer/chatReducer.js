export const initialState = {
  prompt: "",
  response: "",
  loading: false,
  error: null
};

export function chatReducer(state, action) {
  switch (action.type) {
    case "SET_PROMPT":
      return { ...state, prompt: action.payload };

    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, response: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

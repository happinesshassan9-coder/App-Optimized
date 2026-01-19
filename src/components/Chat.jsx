import { useReducer, useCallback, useEffect } from "react";
import { chatReducer, initialState } from "../reducer/chatReducer";
import { getGeminiResponse } from "../services/geminiApi";

export default function Chat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const handleSubmit = useCallback(async () => {
    if (!state.prompt) return;

    dispatch({ type: "FETCH_START" });

    try {
      const result = await getGeminiResponse(state.prompt);
      dispatch({ type: "FETCH_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, [state.prompt]);

  useEffect(() => {
    console.log("Response updated:", state.response);
  }, [state.response]);

  return (
    <div className="chat-container">
      <h2>Gemini AI App</h2>

      <textarea
        placeholder="Ask Gemini something..."
        value={state.prompt}
        onChange={(e) =>
          dispatch({ type: "SET_PROMPT", payload: e.target.value })
        }
      />

      <button onClick={handleSubmit} disabled={state.loading}>
        {state.loading ? "Loading..." : "Send"}
      </button>

      {state.error && <p className="error">{state.error}</p>}
      {state.response && <p className="response">{state.response}</p>}
    </div>
  );
}

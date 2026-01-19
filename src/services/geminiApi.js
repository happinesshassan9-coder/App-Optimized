const API_KEY = "PASTE_YOUR_API_KEY_HERE";

export async function getGeminiResponse(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch response");
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

// services/herbApi.ts
export const GEMINI_API_KEY = "AIzaSyBYCDj2XliY_iFDRNOlj6XPqrIi_d-7imM";
export const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const chatWithHerbBot = async (
  herbName: string | null,
  userInput: string
): Promise<string> => {
  const prompt = `You are an experienced Ayurvedic practitioner and herb expert. ${
    herbName ? `The user is currently exploring the herb "${herbName}".` : ""
  } 

User Question: "${userInput}"

Provide a helpful, accurate response based on traditional Ayurvedic knowledge and modern scientific understanding. Include:
- Ayurvedic perspective (dosha balancing, traditional uses)
- Modern scientific insights when available
- Practical usage guidance
- Important precautions if relevant

Keep your response concise but comprehensive.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user", // ✅ role added
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Sorry, I couldn’t generate a response. Please try again."
    );
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "⚠️ I’m having trouble connecting to the Ayurveda knowledge base right now.";
  }
};

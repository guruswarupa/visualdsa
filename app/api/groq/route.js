import axios from "axios";

const API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req) {
  const { messages } = await req.json();

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-specdec",
        messages,
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const assistantResponse = response.data.choices[0].message.content;
    return new Response(JSON.stringify({ response: assistantResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Groq API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return new Response(
      JSON.stringify({
        error: "Failed to get response from Groq API",
        details: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
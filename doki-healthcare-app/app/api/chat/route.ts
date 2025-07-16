import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Create DeepSeek client
const deepseek = createOpenAI({
  name: "deepseek",
  apiKey: process.env.DEEPSEEK_API_KEY || "",
  baseURL: "https://api.deepseek.com",
})

export async function POST(req: Request) {
  try {
    const { messages, language = "english" } = await req.json()

    const systemPrompt = getSystemPrompt(language)

    const result = await streamText({
      model: deepseek("deepseek-chat"),
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

function getSystemPrompt(language: string): string {
  const basePrompt = `You are DOKI, a helpful AI health assistant designed specifically for Kenya. You provide health information, guidance, and support while being culturally sensitive to Kenyan healthcare needs.

IMPORTANT GUIDELINES:
- Always emphasize that you provide general health information, not medical diagnosis
- Recommend consulting qualified healthcare professionals for serious concerns
- Be aware of Kenya's healthcare system (NHIF/SHIF, public vs private facilities)
- Consider common health challenges in Kenya (malaria, typhoid, respiratory infections)
- Be sensitive to economic constraints many Kenyans face
- Provide practical, actionable advice
- If asked about emergency situations, always recommend immediate medical attention

NEVER:
- Provide specific medical diagnoses
- Recommend specific medications or dosages
- Replace professional medical advice
- Give advice on serious medical procedures`

  const languagePrompts = {
    english: basePrompt + `\n\nRespond in clear, simple English that is easily understood by Kenyans.`,
    swahili:
      basePrompt +
      `\n\nRespond in Kiswahili. Use simple, clear Kiswahili that most Kenyans can understand. You can mix with some English words that are commonly used in Kenya.`,
    kikuyu:
      basePrompt +
      `\n\nRespond in Kikuyu language when possible, but fall back to Kiswahili or English for medical terms that don't have direct translations.`,
    luo: basePrompt + `\n\nRespond in Dholuo when possible, but use Kiswahili or English for complex medical terms.`,
  }

  return languagePrompts[language as keyof typeof languagePrompts] || languagePrompts.english
}

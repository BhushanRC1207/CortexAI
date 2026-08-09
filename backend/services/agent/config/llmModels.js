import {ChatGroq} from "@langchain/groq"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"

const createGroq = () => new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b"
})

const createGemini = () => new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash"
})

export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return createGroq()
        case "search":
            return createGroq()
        case "coding":
            return createGemini()
        default:
            return createGroq()
    }
}
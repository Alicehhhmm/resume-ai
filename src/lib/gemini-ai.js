import { GoogleGenAI } from '@google/genai'

const defaultModel = 'gemini-2.5-flash'
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

const ai = new GoogleGenAI({ apiKey })

// See https://ai.google.dev/api/generate-content#v1beta.GenerationConfig
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
}

export const GeminiGen = content => {
    return ai.models.generateContent({
        model: defaultModel,
        content,
    })
}

export const GeminiChat = ai.chats.create({
    model: defaultModel,
    config: {
        ...generationConfig,
    },
    history: [],
})

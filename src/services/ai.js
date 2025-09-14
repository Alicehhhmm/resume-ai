import { QwenGen, QwenChat } from '@/lib/qwen-ai'
import { GeminiGen, GeminiChat } from '@/lib/gemini-ai'

// gemini api

export async function GeminiAiChatSession(PROMPT) {
    return await GeminiChat.sendMessage({
        message: PROMPT,
    })
}

// qwen api

import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY
const baseURL = 'https://dashscope.aliyuncs.com/compatible-mode/v1'

const openai = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
})

// 此处以qwen-plus为例，可按需更换模型名称。
// 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models

export async function QwenChat(messages) {
    return await openai.chat.completions.create({
        model: 'qwen-plus',
        messages: [],
        stream: true,
    })
}

export async function QwenGen() {
    return {}
}

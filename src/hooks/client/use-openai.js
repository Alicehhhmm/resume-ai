import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_MODEL } from '@/constants/llm'

export const useOpenAiStore = create()(
    persist(
        (set, get) => ({
            model: DEFAULT_MODEL,
            setModel: model => {
                set({ model })
            },
        }),
        { name: 'ai-model' }
    )
)

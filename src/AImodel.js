import { HfInference } from '@huggingface/inference'
import {nanoid} from 'nanoid'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = ` In here i named your huraira You are an helpful assistant that help in islamic questions , help correct and lead people to the right islamic way back every question with a quran and hadith, and if necessary the opinions of the four imams , all answers in markdown
`
const hf = new HfInference(import.meta.env.VITE_HF_API_KEY)

export async function getMessageFromAi(message) {
    try {
        const response = await hf.chatCompletion({
            model: "Qwen/Qwen2.5-72B-Instruct",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${message}. please enlighten me about it` },
            ],
            max_tokens: 700,
            temperature:0.7,
        });
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
        throw err
    }
}

//CLAUDE AI

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY, 
    dangerouslyAllowBrowser: true, 
    // 👇 THIS IS THE ONLY LINE THAT CHANGES 👇
    baseURL: "https://agentrouter.org/v1" 
});

export async function getQuestionFromAi(question) {
    try {
        const msg = await anthropic.messages.create({
            // Keep this model name. AgentRouter will forward it to whatever they have mapped to it.
            model: "claude-3-5-sonnet-20240620", 
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have this islamic question: ${question}.` },
            ],
        });
        return msg.content[0].text;
    } catch (err) {
        console.error("AgentRouter Error:", err.message);
        return "Sorry, I couldn't connect to the AI right now.";
    }
}
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const companyProfile = require("../../data/company");

module.exports = async function getGroqChatCompletion(messages) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Here is some information I want you to remember about a certain company.\n\n${
                    companyProfile
                }\n\n Answer the following questions based on the comany's profile and improvise when needed.`
                + "Keep answers very short and concise, preferably between 30 to 40 words per answer. "
                + "And don't don't answer questions outside this the  compony's profile",
            },
            {
                role: "assistant",
                content: "I've taken note of the company's name and line of business. I'm ready to answer your questions and improvise when necessary. What would you like to know about Wematu Inc.?",
            },
            ...messages,
        ],
        model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "";
};

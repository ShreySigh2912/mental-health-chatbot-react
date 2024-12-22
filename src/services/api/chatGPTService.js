import axios from 'axios';

const API_URL = 'https://api.together.xyz';

const chatGPTService = {
  sendMessage: async (message, conversationHistory = []) => {
    try {
      const response = await axios.post(`${API_URL}/inference`, {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt: formatPrompt(message, conversationHistory),
        max_tokens: 1024,
        stop: ['</s>'],
        temperature: 0.7,
        top_p: 0.7,
        repetition_penalty: 1,
        top_k: 50
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.output.text;
    } catch (error) {
      console.error('Error in chatGPT service:', error);
      throw error;
    }
  }
};

const formatPrompt = (message, conversationHistory) => {
  // Create a context for mental health support
  const systemPrompt = `You are a supportive AI companion focused on mental health. While you can offer understanding and general coping strategies, always clarify that you're not a replacement for professional mental health care. If someone appears to be in crisis, direct them to appropriate emergency resources.`;
  
  // Format conversation history
  const formattedHistory = conversationHistory
    .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
    .join('\n');

  return `${systemPrompt}\n\n${formattedHistory}\nHuman: ${message}\nAssistant:`;
};

export default chatGPTService;
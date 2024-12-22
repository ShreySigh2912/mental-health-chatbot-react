import axios from 'axios';

const API_URL = 'https://api.together.xyz';

const chatGPTService = {
  sendMessage: async (message, conversationHistory = []) => {
    if (!process.env.REACT_APP_TOGETHER_API_KEY) {
      console.error('API key is not configured');
      throw new Error('API configuration is missing');
    }

    try {
      console.log('Sending request to API...');
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

      if (!response.data || !response.data.output || !response.data.output.text) {
        console.error('Invalid API response structure:', response);
        throw new Error('Invalid API response');
      }

      return response.data.output.text;
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 401) {
        throw new Error('API authentication failed. Please check your API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to get response from the AI service');
      }
    }
  }
};

const formatPrompt = (message, conversationHistory) => {
  const systemPrompt = `You are a supportive AI companion focused on mental health. While you can offer understanding and general coping strategies, always clarify that you're not a replacement for professional mental health care. If someone appears to be in crisis, direct them to appropriate emergency resources.`;
  
  const formattedHistory = conversationHistory
    .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
    .join('\n');

  return `${systemPrompt}\n\n${formattedHistory}\nHuman: ${message}\nAssistant:`;
};

export default chatGPTService;
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const executeCode = async (language, sourceCode, input) => {
  try {
    const response = await axios.post(`${BASE_URL}/execute`, {
      language,
      sourceCode,
      input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
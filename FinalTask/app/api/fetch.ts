// fetch.ts

import axios from 'axios';
const fetchData = async (data: { email: string; password: string }) => {
  
  try {
    const response = await axios.post('https://akil-backend.onrender.com/login', data); 
    console.log('Login successful:', response.data);
    
    return response.data.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};


export default fetchData;

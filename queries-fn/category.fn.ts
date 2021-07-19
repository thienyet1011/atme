import axios from 'axios';

export const getCategoriesFn = async () => {
  try {
    const response: any = await axios.get('/api/categories');

    console.log('response: ', JSON.stringify(response));    
    const data = response.data; 

    if (data.payload.success) {
      return data.payload;
    } else {
      throw new Error(
        JSON.stringify({
          status: data.payload.status,
          payload: data.payload.message,
        }),
      );
    }
  } catch (err) {
    throw new Error(
      JSON.stringify({
        status: 500,
        payload: err.message,
      }),
    );
  }
};

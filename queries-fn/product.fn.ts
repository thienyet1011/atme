import axios from 'axios';

export const getProductsFn = async (payload) => {
  try {
    const response: any = await axios.get('/api/products', {
        params: {page: payload.page}
    });

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

export const getProductsFeatureFn = async (payload) => {
  try {
    const response: any = await axios.get('/api/products/feature', {
        params: {page: payload.page}
    });

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

export const getProductsByCategoryFn = async (payload) => {
  try {
    const response: any = await axios.get(`/api/categories/${payload.category_id}/products`, {
        params: {page: payload.page}
    });

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

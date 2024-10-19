import axios from 'axios';
import { API_URL } from '../serviceConfig';
import { MASTERPRODUCTS } from '../endpoints/masterProduct';


export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}${MASTERPRODUCTS.GET_MASTERPRODUCTS}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}${MASTERPRODUCTS.POST_MASTERPRODUCT}`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}${MASTERPRODUCTS.PUT_MASTERPRODUCT}/${id}`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${MASTERPRODUCTS.DELETE_MASTERPRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${MASTERPRODUCTS.GET_MASTERPRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

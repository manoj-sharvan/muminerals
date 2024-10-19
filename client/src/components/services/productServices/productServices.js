import axios from "axios";
import { API_URL } from "../serviceConfig";
import { PRODUCTS } from "../endpoints/product";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}${PRODUCTS.GET_PRODUCTS}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${PRODUCTS.GET_PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${API_URL}${PRODUCTS.POST_PRODUCT}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}${PRODUCTS.PUT_PRODUCT}/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}${PRODUCTS.DELETE_PRODUCT}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

import axios from "axios";
import { API_URL } from "../serviceConfig";
import { SELLERS } from "../endpoints/seller"; // New endpoint for sellers

// Get all sellers
export const getSellers = async () => {
  try {
    const response = await axios.get(`${API_URL}${SELLERS.GET_SELLERS}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get a single seller by ID
export const getSeller = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${SELLERS.GET_SELLER.replace(':id', id)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new seller
export const createSeller = async (sellerData) => {
  try {
    const response = await axios.post(`${API_URL}${SELLERS.POST_SELLER}`, sellerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing seller
export const updateSeller = async (id, sellerData) => {
  try {
    const response = await axios.put(`${API_URL}${SELLERS.PUT_SELLER.replace(':id', id)}`, sellerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a seller
export const deleteSeller = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${SELLERS.DELETE_SELLER.replace(':id', id)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

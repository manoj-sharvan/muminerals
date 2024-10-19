import axios from 'axios';
import { API_URL } from '../serviceConfig';
import { MASTERBUYERS } from '../endpoints/buyer';

// Fetch all buyers
export const getBuyers = async () => {
  try {
    const response = await axios.get(`${API_URL}${MASTERBUYERS.GET_MASTERBUYERS}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new buyer
export const createBuyer = async (buyerData) => {
  try {
    const response = await axios.post(`${API_URL}${MASTERBUYERS.POST_MASTERBUYER}`, buyerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing buyer
export const updateBuyer = async (id, buyerData) => {
  try {
    const response = await axios.put(`${API_URL}${MASTERBUYERS.PUT_MASTERBUYER.replace(':id', id)}`, buyerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a buyer
export const deleteBuyer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${MASTERBUYERS.DELETE_MASTERBUYER.replace(':id', id)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a single buyer by ID
export const getBuyer = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${MASTERBUYERS.GET_MASTERBUYER.replace(':id', id)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

import axios from 'axios';
import { Car } from '../types/Car';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get(`${API_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all cars:', error);
    return [];
  }
};

export const fetchCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await axios.get(`${API_URL}/cars/${id}`);
    if (!response.data) {
      throw new Error('Car not found');
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    return null;
  }
};

export const searchCars = async (query: string): Promise<Car[]> => {
  try {
    const allCars = await fetchAllCars();
    const lowercasedQuery = query.toLowerCase();
    
    return allCars.filter(car => 
      car.brand.toLowerCase().includes(lowercasedQuery) ||
      car.name.toLowerCase().includes(lowercasedQuery) ||
      car.description.toLowerCase().includes(lowercasedQuery)
    );
  } catch (error) {
    console.error('Error searching cars:', error);
    return [];
  }
};

export const filterCarsByBrand = async (brand: string): Promise<Car[]> => {
  try {
    const allCars = await fetchAllCars();
    return allCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
  } catch (error) {
    console.error('Error filtering cars by brand:', error);
    return [];
  }
};
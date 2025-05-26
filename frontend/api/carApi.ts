import { mockAPI } from './appBaseApi';
import { CarCardProps } from '@/types/carType';

// Create a new car
export const createCar = async (car: Omit<CarCardProps, 'id'>): Promise<CarCardProps> => {
  const response = await mockAPI.post<CarCardProps>('/car', car);
  return response.data;
};

// Get all cars
export const getCars = async (): Promise<CarCardProps[]> => {
  const response = await mockAPI.get<CarCardProps[]>('/car');
  return response.data;
};

// Get a single car
export const getCar = async (id: number): Promise<CarCardProps> => {
  const response = await mockAPI.get<CarCardProps>(`/car/${id}`);
  return response.data;
};

// Update a car
export const updateCar = async (car: CarCardProps): Promise<CarCardProps> => {
  const response = await mockAPI.put<CarCardProps>(`/car/${car.id}`, car);
  return response.data;
};

// Delete a car
export const deleteCar = async (id: number): Promise<void> => {
  await mockAPI.delete(`/cars/${id}`);
};
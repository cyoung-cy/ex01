import axios from 'axios';
import type { Board } from '../types/board';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/boards',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBoards = async (): Promise<Board[]> => {
  const response = await apiClient.get('');
  return response.data;
};

export const getBoardById = async (id: number): Promise<Board> => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const createBoard = async (board: Board): Promise<Board> => {
  const response = await apiClient.post('', board);
  return response.data;
};

export const updateBoard = async (id: number, board: Board): Promise<Board> => {
  const response = await apiClient.put(`/${id}`, board);
  return response.data;
};

export const deleteBoard = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};

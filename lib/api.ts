import axios from 'axios';

const API_TOKEN = process.env.NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${API_TOKEN}`;

export const getAllNotes = async (searchText: string, page: number, tag: string) => {
  const response = await axios.get('/notes', {
    params: { search: searchText, page, tag },
  });
  return response.data;
};

export const addNote = async (note: any) => {
  const response = await axios.post('/notes', note);
  return response.data;
};

export const removeNote = async (id: number) => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};

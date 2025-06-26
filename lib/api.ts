import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  tag: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNote = async (id: number) => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNotes = async (search: string, page: number) => {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
    },
  });
  return response.data;
};

interface NewNoteContent {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: NewNoteContent) => {
  const response = await axios.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

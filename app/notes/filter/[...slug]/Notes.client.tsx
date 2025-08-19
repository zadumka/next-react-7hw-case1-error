"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";

import css from "./page.module.css";

interface NotesClientProps {
  notesTag: string;
}

export default function NotesClient({ notesTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

 
  const { data } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, notesTag, currentPage],
    queryFn: () => fetchNotes(),
    placeholderData: keepPreviousData,
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
      <button className={css.button} onClick={toggleModal}>
        Create note +
      </button>

     
      {isModalOpen && (
        <Modal>
          
          <NoteForm onClose={toggleModal} />
        </Modal>
      )}

      <NoteList notes={notes} />
      
    </div>
  );
}

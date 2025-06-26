"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import NoteList from "../../../../components/NoteList/NoteList";
import SearchBox from "../../../../components/SearchBox/SearchBox";

import { Note } from "../../../../types/note";
import css from "./NotesPage.module.css";

import { fetchNotes } from "../../../../lib/api";
import Pagination from "../../../../components/Pagination/Pagination";

import Modal from "../../../../components/Modal/Modal";
import NoteModal from "../../../../components/NoteForm/NoteForm";

type NotesHttpResponse = {
  notes: Note[];
  totalPages: number;
};

type Props = {
  initialValue: NotesHttpResponse;
  tag: string;
};

const NotesClient = ({ initialValue, tag }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Queries
  const [debouncedQuery] = useDebounce(query, 400);

  const { data } = useQuery<NotesHttpResponse>({
    queryKey: ["notes", page, debouncedQuery, tag],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    placeholderData: keepPreviousData,
    initialData: initialValue,
  });

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <>
      <div className={css.toolbar}>
        <SearchBox query={query} updateQuery={updateQuery} />
        {data?.totalPages && data?.totalPages > 1 ? (
          <Pagination
            totalPages={data?.totalPages}
            page={page}
            onPageChange={setPage}
          />
        ) : (
          ""
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteModal />
          </Modal>
        )}
      </div>
      {data.notes.length >= 1 ? (
        <NoteList notes={data?.notes} />
      ) : (
        <p className="error">Oops... We don`t have any entries for you.</p>
      )}
    </>
  );
};

export default NotesClient;

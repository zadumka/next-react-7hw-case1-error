import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: tag } = await params;

  const tagFilter = tag[0] === "All" ? "" : tag[0];

  const data = await fetchNotes({ searchText: "", page: 1, tag: tagFilter });

  return (
    <div>
      <NotesClient initialData={data} tag={tagFilter} />
    </div>
  );
}

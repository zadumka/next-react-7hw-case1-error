import { Tags } from "@/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: [Tags | "All", ...string[]] }>;
}) {
  const { slug: tag } = await params;

  const tagFilter: Tags | "" = tag[0] === "All" ? "" : tag[0];

  const data = await fetchNotes({ tag: tagFilter });

  return (
    <div>
      <NotesClient initialData={data} tag={tagFilter} />
    </div>
  );
}

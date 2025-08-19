import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const queryClient = new QueryClient();

  const { slug: tag } = await params;

  const tagFilter = tag[0] === 'All' ? '' : tag[0];


  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ tag: tagFilter }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagFilter} />
    </HydrationBoundary>
  );
}

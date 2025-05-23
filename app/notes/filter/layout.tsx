import css from './layout.module.css';

type LayoutNotesProps = {
  children: React.ReactNode;
};

export default function LayoutNotes({ children }: LayoutNotesProps) {
  return (
    <section className={css.container}>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}

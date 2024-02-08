import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';

import { NewNoteCard } from '@components/new-note-card';
import { NoteCard } from '@components/note-card';

type Note = {
  id: string;
  date: Date;
  content: string;
};

export const App = () => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const updatedNotes = [newNote, ...notes];

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  function handleSearch(evt: ChangeEvent<HTMLInputElement>) {
    setSearch(evt.target.value);
  }

  const filteredNotes = useMemo(() => {
    if (!search.length) {
      return notes;
    }

    return notes.filter(note =>
      note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
  }, [search, notes]);

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-4 md:px-0">
      <img alt="NLW Expert" src="/media/logo-dark.svg" />

      <form>
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
          placeholder="Search on your notes..."
          type="text"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid auto-rows-[250px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </section>
    </div>
  );
};

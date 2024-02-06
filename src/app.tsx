import { CreateNoteCard } from '@components/create-note-card';
import { NoteCard } from '@components/note-card';

export const App = () => {
  return (
    <div className="*: mx-auto my-12 max-w-6xl space-y-6 px-4 md:px-0">
      <img alt="NLW Expert" src="/media/logo-dark.svg" />

      <form className="">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          placeholder="Search on your notes..."
          type="text"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid auto-rows-[250px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <CreateNoteCard />

        <NoteCard
          at="2 days ago"
          description=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam repudiandae aliquam delectus ad sit, corrupti, voluptas nostrum beatae, suscipit illo corporis blanditiis fugiat odit? "
        />

        <NoteCard
          at="3 days ago"
          description=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam repudiandae aliquam delectus ad sit, corrupti, voluptas nostrum beatae, suscipit illo corporis blanditiis fugiat odit?"
        />

        <NoteCard
          at="4 days ago"
          description=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam repudiandae aliquam delectus ad sit, corrupti, voluptas nostrum beatae, suscipit illo corporis blanditiis fugiat odit?"
        />
      </section>
    </div>
  );
};

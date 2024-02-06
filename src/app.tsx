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
        <article className="flex flex-col gap-3 rounded-md bg-slate-700 p-5">
          <h3 className="text-sm font-medium text-slate-200">Add your note</h3>
          <p className="text-sm leading-6 text-slate-400">
            Record an audio note that will be converted to text automatically.
          </p>
        </article>

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

type CreateNoteCardProps = {
  /**
   * Function to handle the creation of a new note
   */
  onCreate?: () => void;
};

export const CreateNoteCard = ({ onCreate }: CreateNoteCardProps) => {
  return (
    <button
      className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
      onClick={onCreate}
    >
      <h3 className="text-sm font-medium text-slate-200">Add your note</h3>
      <p className="text-sm leading-6 text-slate-400">
        Record an audio note that will be converted to text automatically.
      </p>
    </button>
  );
};

import type { ReactNode } from 'react';

type NoteCardProps = {
  at: string;
  description: ReactNode;
};

export const NoteCard = ({ at, description }: NoteCardProps) => {
  return (
    <button className="relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left outline-none transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <h3 className="text-sm font-medium text-slate-300">{at}</h3>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </button>
  );
};

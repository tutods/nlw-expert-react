import type { ReactNode } from 'react';

type NoteCardProps = {
  at: string;
  description: ReactNode;
};

export const NoteCard = ({ at, description }: NoteCardProps) => {
  return (
    <article className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5">
      <h3 className="text-sm font-medium text-slate-300">{at}</h3>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
};

import type { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { X } from 'lucide-react';

type NoteCardProps = {
  note: {
    id: string;
    date: Date;
    content: ReactNode;
  };
  onNoteDeleted: (id: string) => void;
};

export const NoteCard = ({ note: { id, date, content }, onNoteDeleted }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left outline-none transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <h3 className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(date, { addSuffix: true })}
        </h3>
        <p className="text-sm leading-6 text-slate-400">{content}</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 outline-none transition-colors ease-in-out hover:bg-slate-900 hover:text-slate-100 focus-visible:bg-lime-400 focus-visible:text-lime-950">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(date, { addSuffix: true })}
            </h3>
            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>
          <button
            className="group w-full bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none transition-colors ease-in-out hover:bg-slate-900 focus-visible:bg-slate-950 focus-visible:text-slate-100"
            onClick={() => onNoteDeleted(id)}
            type="button"
          >
            Do you want to{' '}
            <span className="text-red-400 transition-all ease-in-out group-hover:underline group-focus-visible:underline">
              delete this note
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

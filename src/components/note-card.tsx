import type { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { X } from 'lucide-react';

type NoteCardProps = {
  note: {
    date: Date;
    content: ReactNode;
  };
};

export const NoteCard = ({ note: { date, content } }: NoteCardProps) => {
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
        <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
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
            type="button"
          >
            Do you want to{' '}
            <span className="text-red-400 transition-all ease-in-out group-hover:underline">
              delete this note
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

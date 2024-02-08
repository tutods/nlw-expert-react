import type { ChangeEvent } from 'react';
import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import { useDialog } from '@/hooks/use-dialog';
import { useRecording } from '@/hooks/use-recording';

type NewNoteCardProps = {
  onNoteCreated: (content: string) => void;
};

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState('');

  /**
   * Custom hooks
   */
  const { onStartRecording, onStopRecording } = useRecording();
  const { isOpen, onOpenChange } = useDialog(() => {
    setShouldShowOnboarding(true);
    setIsRecording(false);
    setContent('');
  });

  /**
   * Callback function to replace the onboarding with the textarea
   * to write the note
   */
  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  /**
   * Callback to start the recording itself and update the textarea
   * content
   */
  function handleStartRecording() {
    setIsRecording(true);
    setShouldShowOnboarding(false);

    onStartRecording({
      onUnsupportedError: () => {
        toast.error("Sorry, but your browser doesn't support the recording API!");
        setIsRecording(false);
        setShouldShowOnboarding(true);
      },
      onResult: transcription => setContent(transcription),
    });
  }

  /**
   * Callback to stop the recording
   */
  function handleStopRecording() {
    setIsRecording(false);
    onStopRecording();
  }

  /**
   * Callback to update the content while the user writes on
   * the textarea
   * @param evt Textarea event containing the written text
   */
  function handleContentChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = evt.target;

    if (!value.length) {
      setShouldShowOnboarding(true);
    }

    setContent(value);
  }

  /**
   * Callback to save a note with the written/recorded content
   */
  function handleSaveNote() {
    if (!content) {
      return;
    }

    onNoteCreated(content);

    // Reset modal state
    setShouldShowOnboarding(true);
    setContent('');

    toast.success('Note created successfully!');
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Trigger className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <h3 className="text-sm font-medium text-slate-200">Add your note</h3>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be converted to text automatically.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 outline-none transition-colors ease-in-out hover:bg-slate-900 hover:text-slate-100 focus-visible:bg-lime-400 focus-visible:text-lime-950">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-sm font-medium text-slate-300">Add new note</h3>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start by{' '}
                  <button
                    className="font-medium text-lime-400 outline-none transition-all ease-in-out hover:underline focus-visible:underline disabled:cursor-not-allowed"
                    disabled={isRecording}
                    onClick={handleStartRecording}
                    type="button"
                  >
                    recording a note
                  </button>{' '}
                  or, if you prefer,{' '}
                  <button
                    className="font-medium text-lime-400 outline-none transition-all ease-in-out hover:underline focus-visible:underline"
                    onClick={handleStartEditor}
                    type="button"
                  >
                    use only text
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                  id="content"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                className="flex w-full items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none transition-colors ease-in-out hover:text-slate-100 focus-visible:bg-slate-950 focus-visible:text-slate-100"
                onClick={handleStopRecording}
                type="button"
              >
                <span className="size-3 animate-pulse rounded-full bg-red-500 ring-2 ring-red-400/20" />
                Recording (click to stop)
              </button>
            ) : (
              <button
                className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none transition-colors ease-in-out enabled:hover:bg-lime-500 enabled:focus-visible:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!content}
                onClick={handleSaveNote}
                type="button"
              >
                Save a new note
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

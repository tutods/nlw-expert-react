import { useRef } from 'react';

import { toast } from 'sonner';

type OnStartRecordingProps = {
  /**
   * Speech recognition language
   * @default `en`
   */
  language?: string;

  /**
   * Callback function to execute when the recording return results
   * @param transcription Message recorded
   * @returns string The final result of all transcription
   */
  onResult: (transcription: string) => void;

  /**
   * Callback function to execute when Speech Recognition
   * isn't supported on the current browser.
   */
  onUnsupportedError?: () => void;

  /**
   * Callback function to execute when ocurred an error
   * while is recording
   */
  onError?: (evt: SpeechRecognitionErrorEvent) => void;
};

export function useRecording() {
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  function onStartRecording({
    language = 'en',
    onResult,
    onUnsupportedError,
    onError,
  }: OnStartRecordingProps) {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error("Sorry, but your browser doesn't support the recording API!");
      onUnsupportedError?.();
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognitionRef.current = new SpeechRecognitionAPI();

    speechRecognitionRef.current.lang = language;
    speechRecognitionRef.current.continuous = true;
    speechRecognitionRef.current.maxAlternatives = 1;
    speechRecognitionRef.current.interimResults = true;

    speechRecognitionRef.current.onresult = evt => {
      const transcription = Array.from(evt.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      onResult(transcription);
    };

    speechRecognitionRef.current.onerror = evt => {
      onError?.(evt);
    };

    speechRecognitionRef.current.start();
  }

  function onStopRecording() {
    if (!speechRecognitionRef.current) {
      return;
    }

    speechRecognitionRef.current.stop();
  }

  return {
    onStartRecording,
    onStopRecording,
  };
}

import { useState } from 'react';

export function useDialog(onCloseCallback?: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  function onOpenChange(state: boolean) {
    setIsOpen(state);

    if (!!onCloseCallback && state === false) {
      onCloseCallback();
    }
  }

  return {
    isOpen,
    onOpenChange,
  };
}

import { useEffect } from 'react';

type UseSidebarCloseProps = {
  rootRef: React.RefObject<HTMLElement | null>;
  isOpen:boolean;
  onClose: () => void;
}

export const useSidebarClose = ({ rootRef, isOpen, onClose }: UseSidebarCloseProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: MouseEvent): void => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape')
        onClose();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [rootRef, isOpen, onClose]);
};
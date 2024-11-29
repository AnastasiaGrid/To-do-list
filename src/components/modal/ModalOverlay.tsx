import { ReactElement } from 'react';
import '../ui/modalUI/modal.scss';

export function ModalOverlay({ onClick }: { onClick: () => void }): ReactElement {
  return (
    <div className="overlay" onClick={onClick}></div>
  );
}
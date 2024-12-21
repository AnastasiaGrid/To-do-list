import { ReactElement } from 'react';
import './modal.scss';

export function ModalOverlay({ onClick }: { onClick: () => void }): ReactElement {
  return (
    <div className="overlay" onClick={onClick}></div>
  );
}
import { ReactElement } from 'react';
import './modal.module.scss';

export function ModalOverlay({ onClick }: { onClick: () => void }): ReactElement {
  return (
    <div className="overlay" onClick={onClick}></div>
  );
}
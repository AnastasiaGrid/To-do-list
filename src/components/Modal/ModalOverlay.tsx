import { ReactElement } from 'react';
import styles from './Modal.module.scss';

export function ModalOverlay({ onClick }: { onClick: () => void }): ReactElement {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  );
}
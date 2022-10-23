import React from 'react';
import styles from './boardPage.module.css';
import Board from '../../components/Board/Board';

const BoardPage: React.FC = () => {
  return (
    <div className={styles.boardPage}>
      <Board />
    </div>
  );
};

export default BoardPage;

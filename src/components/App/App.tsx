import React from 'react';
import styles from './app.module.css';
import AppRouter from '../AppRouter/AppRouter';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AppTheme from '../AppTheme/AppTheme';

const App: React.FC = () => {
  return (
    <AppTheme>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </AppTheme>
  );
};

export default App;

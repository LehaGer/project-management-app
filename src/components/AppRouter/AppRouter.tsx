import React from 'react';
import { Route, Routes } from 'react-router-dom';
import APP_ROUTES from '../../constants/appRoutes';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainPage from '../../pages/MainPage/MainPage';
import BoardPage from '../../pages/BoardPage/BoardPage';
import SignUpPage from '../../pages/SignUpPage/signUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useAppSelector } from '../../hooks/redux';

const AppRouter: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.basis);

  return (
    <Routes>
      <Route path={APP_ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={APP_ROUTES.MAIN} element={isAuth ? <MainPage /> : <SignInPage />} />
      <Route
        path={`${APP_ROUTES.BOARD}/:boardId`}
        element={isAuth ? <BoardPage /> : <SignInPage />}
      />
      <Route path={APP_ROUTES.SIGN_IN} element={isAuth ? <MainPage /> : <SignInPage />} />
      <Route path={APP_ROUTES.SIGN_UP} element={isAuth ? <MainPage /> : <SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;

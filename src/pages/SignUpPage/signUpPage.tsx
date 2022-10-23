import React from 'react';
import styles from './signUpPage.module.css';
import { FormikErrors, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from '@mui/material';
import { BASE_URL_API } from '../../constants/appConstants';
import { setIsAuth, setToken, setUserId } from '../../store/reducers/basisSlice';
import { useAppDispatch } from '../../hooks/redux';

export interface FormSingUpInputs {
  name: string;
  login: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const validate = async (values: FormSingUpInputs) => {
    const errors: FormikErrors<FormSingUpInputs> = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 4) {
      errors.name = 'Name must consist of 4 characters or more';
    }

    if (!values.login) {
      errors.login = 'Required';
    } else if (values.login.length < 4) {
      errors.login = 'Login must consist of 4 characters or more';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must consist of 6 characters or more';
    }

    const makeAuthorisation = async (login: string, password: string) => {
      const getJWT = async (login: string, password: string) => {
        let response;
        try {
          response = await fetch(BASE_URL_API + '/signin', {
            body: JSON.stringify({ login, password }),
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } catch (err) {
          console.log(err);
          errors.password = 'Incorrect login or password';
          response = null;
        }
        const finalResponse = await response?.json();
        return finalResponse?.token;
      };
      const getDataFromJWT = (token: string) => JSON.parse(atob(token.split('.')[1]));

      const token = await getJWT(login, password);
      const dataFromJWT = getDataFromJWT(token);

      dispatch(setToken(token));
      dispatch(setUserId(dataFromJWT.userId));
      dispatch(setIsAuth(true));

      const authData = {
        token: token,
        userId: dataFromJWT.userId,
        isAuth: true,
      };
      localStorage.setItem('authData', JSON.stringify(authData));
    };
    const createAccount = async (values: FormSingUpInputs) => {
      const getResponce = async (values: FormSingUpInputs) => {
        let response;
        try {
          response = await fetch(BASE_URL_API + '/signup', {
            body: JSON.stringify(values),
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } catch (err) {
          console.log(err);
          response = null;
        }
        return await response?.json();
      };
      const creationResponce = await getResponce(values);
      return creationResponce;
    };
    const creationResult = await createAccount(values);

    if (creationResult) {
      await makeAuthorisation(values.login, values.password);
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      navigate('/');
    },
  });

  return (
    <div className={styles.signUpPage}>
      <Typography variant="h5" component="h1" mt={2} mb={2}>
        Sign Up:
      </Typography>
      <form className={styles.signUpForm} onSubmit={formik.handleSubmit}>
        <label htmlFor="name">
          Enter your name:
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </label>
        {formik.touched.name && formik.errors.name ? (
          <Typography className={styles.error}>{formik.errors.name}</Typography>
        ) : null}
        <label htmlFor="login">
          Enter your login:
          <Input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
        </label>
        {formik.touched.login && formik.errors.login ? (
          <Typography className={styles.error}>{formik.errors.login}</Typography>
        ) : null}
        <label htmlFor="password">
          Enter your password:
          <Input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <Typography className={styles.error}>{formik.errors.password}</Typography>
        ) : null}
        <Button sx={{ marginBottom: 2 }} variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;

import React from 'react';
import styles from './welcomePage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { TEAM_INFO } from '../../constants/teamInfo';

const WelcomePage: React.FC = () => {
  const { language } = useAppSelector((state) => state.basis);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.welcomePage}>
      {/*<div className="DELETE_BLOCK">
        <button onClick={() => dispatch(setLanguage('ru'))}>change language in state</button>
        <p>{language}</p>
      </div>*/}

      <div className={styles.commonInfo}>
        <div className={styles.commonInfoHead}>
          <Typography
            variant="h1"
            component="div"
            className={styles.appName}
            sx={{ fontSize: { xs: '2em', sm: '3em', md: '5em' } }}
          >
            Welcome to
            <Typography
              variant="h2"
              component="div"
              sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.75rem' } }}
            >
              Project-management-app
            </Typography>
          </Typography>
        </div>
        <Typography
          className={styles.commonInfoDescription}
          sx={{ fontSize: { xs: '.9em', sm: '1em', md: '1.3em' }, marginTop: '1.5em' }}
        >
          A project management system - is an application that helps an individual in a team or
          group of developers achieve their goals.
        </Typography>
      </div>
      <div className={styles.teamInfo}>
        <Typography className={styles.teamInfoHead}>Developed by team:</Typography>
        <div className={styles.teamInfoContent}>
          {TEAM_INFO.map((developerItem, index) => (
            <div key={index}>
              <Tooltip title={developerItem.name} arrow>
                <IconButton href={developerItem.ghPage}>
                  <Avatar
                    alt={developerItem.name}
                    className={styles[`avatar_${index + 1}`]}
                    sx={{ width: 56, height: 56 }}
                  >
                    {developerItem.nameShort}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      <Typography className={styles.taskInfo}>final task of REACT 2022Q1 course</Typography>
    </div>
  );
};

export default WelcomePage;

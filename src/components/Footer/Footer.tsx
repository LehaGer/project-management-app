import React from 'react';
import styles from './footer.module.css';
import { Avatar, Button, Chip, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { TEAM_INFO } from '../../constants/teamInfo';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.courseInfo}>
        <Tooltip title="Learn more">
          <Button href={'https://rs.school/react/'} color="inherit">
            <img src={'rs_school_js.svg'} alt={'rsschool link'} />
          </Button>
        </Tooltip>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem className={styles.yearVertical}>
        <Tooltip title="Creating date">
          <Chip label="2022" />
        </Tooltip>
      </Divider>
      <Divider flexItem className={styles.yearHorizontal}>
        <Tooltip title="Creating date">
          <Chip label="2022" />
        </Tooltip>
      </Divider>
      <div className={styles.ghRepositories}>
        <div className={styles.ghRepoText}>
          <Typography>developers repositories:</Typography>
        </div>
        {TEAM_INFO.map((developerItem, index) => (
          <div key={index}>
            <Tooltip title={developerItem.name} arrow>
              <IconButton href={developerItem.ghPage}>
                <Avatar alt={developerItem.name} className={styles[`avatar_${index + 1}`]}>
                  {developerItem.nameShort}
                </Avatar>
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

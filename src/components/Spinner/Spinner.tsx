import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

const Spinner: React.FC = () => {
  return (
    <Stack alignItems="center" mt={2} mb={2}>
      <CircularProgress />
    </Stack>
  );
};

export default Spinner;

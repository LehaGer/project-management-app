import React, { useCallback, useState } from 'react';
import { Alert, AlertTitle, Stack } from '@mui/material';
import { responseError } from '../types/interfaces';
import ERROR_MESSAGES from '../constants/errorMessages';
import Modal from '../components/Modal/Modal';

const useErrorHandler = () => {
  const [alerts, setAlerts] = useState<Array<JSX.Element>>([]);

  const submitError = useCallback((alert: responseError): void => {
    const { statusCode, message } = alert.data;
    const messageForAlert = ERROR_MESSAGES[message] || message;

    const alertElement = (
      <Alert severity="error">
        <AlertTitle>Error {statusCode}</AlertTitle>
        {messageForAlert}
      </Alert>
    );

    setAlerts((alerts) => [...alerts, alertElement]);

    setTimeout(() => {
      setAlerts((alerts) => alerts.slice(1));
    }, 3000);
  }, []);

  const errorAlertsElement = (
    <Modal>
      <Stack
        sx={{
          width: 'auto',
          position: 'fixed',
          bottom: '16px',
          left: '16px',
        }}
        spacing={2}
      >
        {alerts.map((alert, index) => {
          return <React.Fragment key={index}>{alert}</React.Fragment>;
        })}
      </Stack>
    </Modal>
  );

  return { errorAlertsElement, submitError };
};
export default useErrorHandler;

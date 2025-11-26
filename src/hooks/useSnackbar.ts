import { useState, useCallback } from 'react';
import { SnackbarType } from '../components/Snackbar';

interface SnackbarState {
  visible: boolean;
  message: string;
  type: SnackbarType;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = 'info') => {
      setSnackbar({
        visible: true,
        message,
        type,
      });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const showSuccess = useCallback(
    (message: string) => showSnackbar(message, 'success'),
    [showSnackbar]
  );

  const showError = useCallback(
    (message: string) => showSnackbar(message, 'error'),
    [showSnackbar]
  );

  const showWarning = useCallback(
    (message: string) => showSnackbar(message, 'warning'),
    [showSnackbar]
  );

  const showInfo = useCallback(
    (message: string) => showSnackbar(message, 'info'),
    [showSnackbar]
  );

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

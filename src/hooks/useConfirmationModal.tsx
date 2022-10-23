import { useState, useEffect } from 'react';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';

const useConfirmationModal = (title: string) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  useEffect(() => {
    if (isAgree) {
      setTimeout(() => {
        setIsAgree(false);
      });
    }
  }, [isAgree]);

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const confirmationModalElement = (
    <ConfirmationModal
      title={title}
      isConfirmationModalOpen={isConfirmationModalOpen}
      setIsConfirmationModalOpen={setIsConfirmationModalOpen}
      setIsAgree={setIsAgree}
    />
  );

  return {
    confirmationModalElement,
    isAgree,
    openConfirmationModal,
  };
};

export default useConfirmationModal;

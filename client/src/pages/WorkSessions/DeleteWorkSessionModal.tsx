import { Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useDeleteAll } from '../../API/WorkSessionsAPI';
import { useApiToast } from '../../Hooks/useApiToast';
import ConfirmationModal from '../../components/ConfirmationModal';

function DeleteWorkSessionModal() {
  const [DeleteAll, DeleteResult] = useDeleteAll();

  useApiToast({
    Result: DeleteResult,
    ErrorMessage: 'Error deleting work sessions',
    successMessage: 'Work sessions deleted',
    loadingMessage: 'Deleting work sessions',
  });

  const ConfirmDelete = (e: any) => {
    e.preventDefault();
    const FormValues = e.target.elements;
    const { Confirm } = FormValues;

    if (Confirm.value === `Sure`) {
      DeleteAll();
    } else {
      toast.error('Please confirm the title', {
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <ConfirmationModal
        OnSubmit={ConfirmDelete}
        placeholder="Type Sure"
        Result={DeleteResult}
        Title="Delete All Work Sessions"
      >
        <Button
          mt={5}
          colorScheme="red"
          w="100%"
          variant="outline"
          _hover={{
            bg: 'red',
            color: 'white',
          }}
        >
          Delete All Work Session
        </Button>
      </ConfirmationModal>
    </div>
  );
}

export default DeleteWorkSessionModal;

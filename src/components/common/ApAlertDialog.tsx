import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useRef } from 'react';

interface PageProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  alertTitle: string;
  alertMsg: string;
  confirmBtnTitle: string;
  confirmCallBack: () => {};
}

const ApAlertDialog = ({
  isOpen,
  setIsOpen,
  alertTitle,
  alertMsg,
  confirmBtnTitle,
  confirmCallBack,
}: PageProps) => {
  const cancelRef = useRef<any>();
  const onClose = () => setIsOpen(false);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent width={'90%'}>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
              className='font-bold text-xl'
            >
              {alertTitle}
            </AlertDialogHeader>
            <hr className='bg-[rgba(256,256,256,0.3)]' />

            <AlertDialogBody className='text-lg font-semibold'>
              {alertMsg}
            </AlertDialogBody>

            <AlertDialogFooter className='flex gap-6 font-bold text-lg'>
              <button
                className='flex gap-1 items-center px-3 border-1 transition duration-200 border-gray-400 justify-center rounded-lg text-gray-400 hover:bg-gray-400 hover:text-white'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className='flex gap-1 items-center px-3 border-1 transition duration-200 border-amber-500 justify-center rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white'
                onClick={() => {
                  confirmCallBack();
                  onClose();
                }}
              >
                {confirmBtnTitle}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ApAlertDialog;

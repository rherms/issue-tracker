import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useContext, useState } from 'react';
import { CreateIssueParams, IssueContext } from '../../IssueContext';
import { Priority } from '../../const';
import { NewIssueForm } from './NewIssueForm';

const DEFAULT_PARAMS: CreateIssueParams = {
  title: '',
  description: '',
  priority: Priority.Medium,
};

export const NewIssueButton = React.memo(function NewIssueButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createParams, setCreateParams] = useState<CreateIssueParams>(DEFAULT_PARAMS);
  const context = useContext(IssueContext);

  const handleCreateIssue = useCallback(async () => {
    setIsCreating(true);
    await context.createIssue(createParams);
    onClose();
    setCreateParams(DEFAULT_PARAMS);
    setIsCreating(false);
  }, [context.createIssue, createParams, onClose]);

  return (
    <>
      <Button className="App-new-issue-button" colorScheme="teal" leftIcon={<AddIcon />} onClick={onOpen}>
        New Issue
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewIssueForm createParams={createParams} updateParams={setCreateParams} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isCreating} colorScheme="green" onClick={handleCreateIssue}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

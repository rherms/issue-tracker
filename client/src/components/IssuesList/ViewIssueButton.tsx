import React, { useCallback, useContext } from 'react';
import { Issue } from '../../Issue';
import {
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { renderPriority } from '../../utils/renderPriority';
import { Status } from '../../const';
import { IssueContext } from '../../IssueContext';

interface ViewIssueButtonProps {
  issue: Issue;
}

export const ViewIssueButton = React.memo(function ViewIssueButton(props: ViewIssueButtonProps) {
  const { issue } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateIssueStatus } = useContext(IssueContext);

  const handleStatusChange = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      updateIssueStatus(issue.id, evt.currentTarget.value as Issue['status']);
    },
    [updateIssueStatus, issue.id],
  );

  return (
    <>
      <Tooltip label="View Issue">
        <IconButton aria-label="view-issue" variant="ghost" icon={<ViewIcon />} onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{issue.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <div>
                <Heading size="sm">Description</Heading>
                <div>{issue.description}</div>
              </div>
              <div>
                <Heading size="sm">Status</Heading>
                <Select mt="2" mb="2" value={issue.status} onChange={handleStatusChange}>
                  <option value={Status.Open}>{Status.Open}</option>
                  <option value={Status.InProgress}>{Status.InProgress}</option>
                  <option value={Status.Resolved}>{Status.Resolved}</option>
                </Select>
              </div>
              <div>
                <Heading size="sm">Priority</Heading>
                <div>{renderPriority(issue.priority)}</div>
              </div>
              <div>
                <Heading size="sm">Created</Heading>
                <div>{new Date(issue.createTimestampMs).toLocaleString()}</div>
              </div>
              <div>
                {/* TODO: something like "5 minutes ago" */}
                <Heading size="sm">Last Updated</Heading>
                <div>{new Date(issue.lastUpdatedTimestampMs).toLocaleString()}</div>
              </div>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

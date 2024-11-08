import React, { useCallback, useContext } from 'react';
import { useIssue } from '../../hooks/useIssue';
import { HStack, IconButton, Skeleton, Td, Tooltip, Tr } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IssueContext } from '../../IssueContext';
import { ViewIssueButton } from './ViewIssueButton';
import { renderPriority } from '../../utils/renderPriority';

interface IssuesListRowProps {
  issueId: string;
}

export const IssuesListRow = React.memo(function IssuesListRow(props: IssuesListRowProps) {
  const { issueId } = props;
  const issue = useIssue(issueId);
  const { deleteIssue } = useContext(IssueContext);

  const handleDelete = useCallback(() => {
    deleteIssue(issueId);
  }, [deleteIssue, issueId]);

  if (issue == null) {
    return (
      <Tr>
        <Td>
          <Skeleton>XXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XX XX</Skeleton>
        </Td>
      </Tr>
    );
  }

  return (
    <Tr>
      <Td>{issue.title}</Td>
      <Td>{issue.status}</Td>
      <Td>{renderPriority(issue.priority)}</Td>
      <Td>
        <HStack>
          <ViewIssueButton issue={issue} />
          {/* TODO: delete confirmation modal */}
          <Tooltip label="Delete Issue">
            <IconButton
              aria-label="delete-issue"
              color="red.500"
              variant="ghost"
              icon={<DeleteIcon />}
              title="Delete Issue"
              onClick={handleDelete}
            />
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
});

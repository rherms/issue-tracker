import React from 'react';
import { useIssue } from '../../hooks/useIssue';
import { AlertIcon, Skeleton, Td, Tr } from '@chakra-ui/react';
import { Priority } from '../../const';
import { WarningTwoIcon } from '@chakra-ui/icons';

interface IssuesListRowProps {
  issueId: string;
}

export const IssuesListRow = React.memo(function IssuesListRow(props: IssuesListRowProps) {
  const { issueId } = props;
  const issue = useIssue(issueId);

  if (issue == null) {
    return (
      <Tr>
        <Td>
          <Skeleton>XXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXXXXXXX XXXXXXXXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXXXXXX</Skeleton>
        </Td>
        <Td>
          <Skeleton>XXXXXXXXX</Skeleton>
        </Td>
      </Tr>
    );
  }

  return (
    <Tr>
      <Td>{issue.title}</Td>
      <Td>{issue.description}</Td>
      <Td>{issue.status}</Td>
      <Td>
        {issue.priority}
        {issue.priority === Priority.High && <WarningTwoIcon ml="2" color="orange" />}
      </Td>
      <Td>{new Date(issue.createTimestampMs).toLocaleString()}</Td>
      {/* TODO: show something like "5 minutes ago" */}
      <Td>{new Date(issue.lastUpdatedTimestampMs).toLocaleString()}</Td>
    </Tr>
  );
});

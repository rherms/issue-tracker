import React from 'react';
import { IssuesListRow } from './IssuesListRow';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

interface IssuesListProps {
  issueIds: Set<string>;
}

export const IssuesList = React.memo(function IssuesList(props: IssuesListProps) {
  const { issueIds } = props;
  if (props.issueIds.size === 0) {
    return <div>No issues yet. Click "New Issue" to create one.</div>;
  }
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
            <Th>Created</Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from(issueIds).map((issueId) => (
            <IssuesListRow issueId={issueId} key={issueId} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

import React from 'react';

interface IssuesListProps {
  issueIds: Set<string>;
}

export const IssuesList = React.memo(function IssuesList(props: IssuesListProps) {
  return null;
});
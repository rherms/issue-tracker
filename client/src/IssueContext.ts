import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Issue } from './Issue';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

interface IssueContextType {
  allIssueIds: Set<string> | undefined; // undefined if loading
  issuesById: { [issueId: string]: Issue | undefined };
  setIssue: (issue: Issue) => Promise<void>;
  deleteIssue: (issueId: string) => Promise<void>;
}

export const IssueContext = createContext<IssueContextType>({
  allIssueIds: new Set(),
  issuesById: {},
  setIssue: async () => void 0,
  deleteIssue: async () => void 0,
});

export function useIssueContext(): IssueContextType {
  const toast = useToast();
  const [issuesById, setIssuesById] = useState<{ [issueId: string]: Issue }>({});
  const [allIssueIds, setAllIssueIds] = useState<Set<string> | undefined>();
  const pollTimer = useRef<NodeJS.Timer>();

  // Polling for all known issue ids
  useEffect(() => {
    pollTimer.current = setInterval(async () => {
      const response = await axios.get('http://localhost:8080/issues');
      console.log('Get all issue ids', response);
      setAllIssueIds(new Set(response.data));
    }, 1_000);

    return () => {
      clearInterval(pollTimer.current);
    };
  }, []);

  // Deleting an issue
  const deleteIssue = useCallback(
    async (issueId: string) => {
      // TODO: optimistic update
      try {
        await axios.get(`http://localhost:8080/delete/${issueId}`);
        setIssuesById((prev) => {
          delete prev[issueId];
          return prev;
        });
        setAllIssueIds((prev) => {
          prev?.delete(issueId);
          return prev;
        });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Unable to delete issue.',
          status: 'error',
          isClosable: true,
        });
      }
    },
    [toast],
  );

  // Setting an issue
  const setIssue = useCallback(
    // Have this weird persist flag because the spec said to only support updating status in the BE endpoint
    async (issue: Issue, persist?: boolean) => {
      // TODO: optimistic update
      try {
        if (persist) {
          await axios.post('http://localhost:8080/update-status', { issueId: issue.id, newStatus: issue.status });
        }
        setIssuesById((prev) => {
          prev[issue.id] = issue;
          return prev;
        });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Unable to update issue.',
          status: 'error',
          isClosable: true,
        });
      }
    },
    [toast],
  );

  return useMemo(
    () => ({ allIssueIds, issuesById, deleteIssue, setIssue }),
    [allIssueIds, issuesById, deleteIssue, setIssue],
  );
}

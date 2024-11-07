import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Issue } from './Issue';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

export type CreateIssueParams = Pick<Issue, 'description' | 'title' | 'priority'>;

interface IssueContextType {
  allIssueIds: Set<string> | undefined; // undefined if loading
  issuesById: { [issueId: string]: Issue | undefined };
  /** Just setting locally in frontend state */
  setIssue: (issue: Issue) => void;
  createIssue: (issue: CreateIssueParams) => Promise<void>;
  updateIssueStatus: (issueId: string, newStatus: Issue['status']) => Promise<void>;
  deleteIssue: (issueId: string) => Promise<void>;
}

export const IssueContext = createContext<IssueContextType>({
  allIssueIds: new Set(),
  issuesById: {},
  setIssue: () => void 0,
  createIssue: async () => void 0,
  updateIssueStatus: async () => void 0,
  deleteIssue: async () => void 0,
});

// TODO: break these out into separate files if context gets any larger
export function useIssueContext(): IssueContextType {
  const toast = useToast();
  const [issuesById, setIssuesById] = useState<{ [issueId: string]: Issue }>({});
  const [allIssueIds, setAllIssueIds] = useState<Set<string> | undefined>();
  const pollTimer = useRef<NodeJS.Timer>();

  // Polling for all known issue ids
  useEffect(() => {
    pollTimer.current = setInterval(async () => {
      const response = await axios.get('http://localhost:8080/issues');
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
          const next = { ...prev };
          delete next[issueId];
          return next;
        });
        setAllIssueIds((prev) => {
          if (!prev) return prev;
          const next = new Set(prev);
          next.delete(issueId);
          return next;
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

  // Setting an issue locally
  const setIssue = useCallback((issue: Issue) => {
    setIssuesById((prev) => {
      const next = { ...prev };
      next[issue.id] = issue;
      return next;
    });
  }, []);

  // Updating an issue status
  const updateIssueStatus = useCallback(
    async (issueId: string, newStatus: Issue['status']) => {
      // TODO: optimistic update
      try {
        await axios.post('http://localhost:8080/update-status', { issueId, newStatus });
        setIssuesById((prev) => {
          const next = { ...prev };
          next[issueId] = { ...prev[issueId], status: newStatus };
          return next;
        });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Unable to update issue status.',
          status: 'error',
          isClosable: true,
        });
      }
    },
    [toast],
  );

  // Creating a new issue
  const createIssue = useCallback(
    async (issue: CreateIssueParams) => {
      // TODO: optimistic update
      try {
        const response = await axios.post('http://localhost:8080/create', issue);
        setIssue(response.data);
        setAllIssueIds((prev) => {
          if (!prev) return new Set([response.data]);
          const next = new Set(prev);
          next.add(response.data);
          return next;
        });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Unable to create issue.',
          status: 'error',
          isClosable: true,
        });
      }
    },
    [toast, setIssue],
  );

  return useMemo(
    () => ({ allIssueIds, issuesById, createIssue, updateIssueStatus, deleteIssue, setIssue }),
    [allIssueIds, issuesById, deleteIssue, createIssue, updateIssueStatus, setIssue],
  );
}

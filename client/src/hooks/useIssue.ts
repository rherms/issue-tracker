import { useContext, useEffect } from 'react';
import { IssueContext } from '../IssueContext';
import axios from 'axios';
import { Issue } from '../Issue';

/**
 * Loads an issue into application context if it is not loaded yet.
 *
 * @param issueId issue id
 * @returns loaded Issue
 */
export function useIssue(issueId: string): Issue | undefined {
  const context = useContext(IssueContext);

  useEffect(() => {
    let isCancelled = false;

    async function loadIssue() {
      if (!context.issuesById[issueId]) {
        const response = await axios.get(`http://localhost:8080/issue/${issueId}`);
        if (isCancelled) return;
        console.log(response);
        context.setIssue(response.data);
      }
    }

    loadIssue();

    return () => {
      isCancelled = true;
    };
    // only want to run this effect when issue id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueId]);

  return context.issuesById[issueId];
}

import './App.css';
import { Button, ChakraProvider, Spinner, Heading } from '@chakra-ui/react';
import { IssuesList } from './components/IssuesList/IssuesList';
import { AddIcon } from '@chakra-ui/icons';
import { IssueContext, useIssueContext } from './IssueContext';

function App() {
  const issueContext = useIssueContext();

  return (
    <ChakraProvider>
      <IssueContext.Provider value={issueContext}>
        <div className="App">
          <header className="App-header">
            <Heading>Ryan's Issue Tracker</Heading>
            <Button className="App-new-issue-button" colorScheme="teal" leftIcon={<AddIcon />}>
              New Issue
            </Button>
          </header>
          <div className="App-container">
            {issueContext.allIssueIds != null ? (
              <IssuesList issueIds={issueContext.allIssueIds} />
            ) : (
              <Spinner size="xl" />
            )}
          </div>
        </div>
      </IssueContext.Provider>
    </ChakraProvider>
  );
}

export default App;

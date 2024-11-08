import './App.css';
import { ChakraProvider, Spinner, Heading } from '@chakra-ui/react';
import { IssuesList } from './components/IssuesList/IssuesList';
import { IssueContext, useIssueContext } from './IssueContext';
import { NewIssueButton } from './components/NewIssue/NewIssueButton';

function App() {
  const issueContext = useIssueContext();

  return (
    <ChakraProvider>
      <IssueContext.Provider value={issueContext}>
        <div className="App">
          <header className="App-header">
            <Heading>Ryan's Issue Tracker</Heading>
            <NewIssueButton />
          </header>
          <div className={`App-container ${issueContext.allIssueIds == null ? 'loading' : ''}`}>
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

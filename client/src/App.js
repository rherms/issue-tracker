import axios from 'axios';
import './App.css';
import { Priority, Status } from './const';

const TEST_ISSUE = {
  title: 'Test issue 1',
  description: 'this is a test issue',
  status: Status.Open,
  priority: Priority.Medium,
};

// data will be the string we send from our server
const apiCall = () => {
  axios.post('http://localhost:8080/create', TEST_ISSUE).then((data) => {
    // this console.log will be in our frontend console
    console.log(data);
  });
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;

import axios from 'axios'
import { useEffect } from 'react'
import './App.css';

function App() {
  const callApi = async () => {
    axios.get('/').then((res) => console.log(res));
  }

  useEffect(() => {
    callApi();
  }, []);
  return <div>test</div>
}

export default App;

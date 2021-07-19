import axios from 'axios'
import { useEffect } from 'react'
import FacebookLogin from "react-facebook-login";
import './App.css';

const responseFacebook = (response) => {
  console.log(response);
}

function App() {
  const callApi = async () => {
    axios.get('/api').then((res) => console.log(res.data.test));
  }

  useEffect(() => {
    callApi();
  }, []);
  return <div>
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  </div>
}

export default App;

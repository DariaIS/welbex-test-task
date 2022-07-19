import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import './app.css';


const App: React.FC = () => {
  useEffect(() => {
    console.log('getByNowEffect');
    Axios.get('http://localhost:8080/api/comps')
      .then((response) => {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  return (

    <div>
      Hello world
    </div>
  )
}

export default App;

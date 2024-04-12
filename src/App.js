import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Inicio from './components/Screens/Inicio';
import Login from './components/Screens/Login';

function App() {
  const { isAuthenticated,isLoading } = useAuth0();
  if(isLoading){return <h2>Cargando...</h2>}
  return (
    <div className="App">
      {isAuthenticated?(<Inicio/>):(<Login/>)
      
      }
      
    </div>
  );
}

export default App;

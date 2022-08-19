import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Router from './components/Router';

function App() {
  return (
  <div className="App">
   <ChakraProvider>
        <Router />
      </ChakraProvider>
  </div>
  );
}

export default App;

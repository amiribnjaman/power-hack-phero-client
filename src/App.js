import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [totalPaid, setTotalPaid] = useState(0)
  const [reRender, setReRender] = useState(false)

  return (
    <div>
      <Navbar 
      reRender={reRender}
      setReRender={setReRender}
      totalPaid={totalPaid}/>
      <Body 
      reRender={reRender}
      setReRender={setReRender}
      setTotalPaid={setTotalPaid}/>
      <ToastContainer 
      position="top-center"
      />
    </div>
  );
}

export default App;

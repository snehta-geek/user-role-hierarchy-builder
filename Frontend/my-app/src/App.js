import './App.css';
import Signin from './Components/signin';
import Signup from './Components/signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from "react-router-dom";
import GetReportees from './Components/getReportees';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='/get-reportees' element={<GetReportees/>}/>    
   
      
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

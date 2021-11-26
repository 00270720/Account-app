import Login from './Pages/Login';
import User from './Pages/User';
import Admin from './Pages/Admin';
import ReferUser from './Pages/ReferUser';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lock from "./Components/LockRoutes"



function App() {
  return (
    <BrowserRouter>
      <Routes>        

        <Route path="/user" element={<Lock role = "user" >< User/> </Lock>} />
        <Route path="/admin" element={<Lock role = "admin" >< Admin/> </Lock>} />
        
        <Route path="/refer" element={<ReferUser />}/>

        <Route path="*" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

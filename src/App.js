import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './Componentes/Login/Registro';
import Login from './Componentes/Login/Login';
import Dashboard from './Componentes/Dashboard/Dashboard';
import ValidarAccesoRoute from './Componentes/Dashboard/ValidadAccesoRoute';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/dashboard" element={
            <ValidarAccesoRoute>
              <Dashboard />
            </ValidarAccesoRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

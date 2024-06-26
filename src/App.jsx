import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Pages/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import { Record } from './Components/Pages/Record/Record';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/GaiaVet-Front" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Record />} />
          {/* Otras rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Pages/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import { Record } from './Components/Pages/Record/Record';
import { Footer } from "./Components/Layouts/Footer/Footer";
import { HairSalon } from "./Components/HairSalon/HairSalon";
import { Bathroom } from "./Components/Bathroom/Bathroom"

import './App.css'
import { PetDaycare } from './Components/PetDaycare/PetDaycare';
import { GeneralInquiry } from './Components/GeneralInquiry/GeneralInquiry';
import { Pets } from './Components/Pets/Pets';

function App() {
  return (
    <Router>
      <div className='bgImg'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Record />} />

          {/* Services */}
          <Route path="/peluqueria" element={<HairSalon title='Peluqueria' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/baño" element={<Bathroom title='Baño' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/guarderia" element={<PetDaycare title='Guarderia' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/consulta" element={<GeneralInquiry title='consulta' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />
          <Route path="/pets" element={<Pets />} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );

}

export default App;

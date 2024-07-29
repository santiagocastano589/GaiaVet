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
import { Profile } from './Components/Pages/Profile/Profile';
import { ProductsShop } from './Components/ProductsShop/ProductsShop';
import { PetHistory } from './Components/PetHistory/PetHistory';


function App() {
  return (
    <Router>
      <div className='bgImg'>
        <Routes>
          {/* Pages */}
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Record />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/shop" element={<ProductsShop />} />
          <Route path="/history" element={<PetHistory />} />

          {/* Services */}
          <Route path="/peluqueria" element={<HairSalon title='Peluqueria' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/baño" element={<Bathroom title='Baño' description='El baño no es solo una simple limpieza, sino una experiencia completa de bienestar y cuidado para tu peludito amigo. Imagina un spa para mascotas donde tu perro o gato recibe un tratamiento personalizado que lo deja no solo limpio y con un pelaje brillante, sino también relajado y feliz.' servicio='' />} />

          <Route path="/guarderia" element={<PetDaycare title='Guarderia' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/consulta" element={<GeneralInquiry title='consulta' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />
          

        </Routes>
      </div>
      <Footer/>
    </Router>

   
  );

}

export default App;

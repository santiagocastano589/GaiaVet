import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './Components/Pages/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import { Record } from './Components/Pages/Record/Record';
import { Footer } from "./Components/Layouts/Footer/Footer";
import { HairSalon } from "./Components/HairSalon/HairSalon";
import { Bathroom } from "./Components/Bathroom/Bathroom";
import bot from './assets/bot.png';
import './App.css';
import { PetDaycare } from './Components/PetDaycare/PetDaycare';
import { GeneralInquiry } from './Components/GeneralInquiry/GeneralInquiry';
import { Pets } from './Components/Pages/Pets/Pets';
import { Profile } from './Components/Pages/Profile/Profile';
import { PetHistory } from './Components/Pages/PetHistory/PetHistory';
import { PetRegister } from './Components/Pages/PetRegister/PetRegister';
import { ProductsShop } from './Components/Pages/ProductsShop/ProductsShop';
import { Citas2 } from './Components/Pages/Citas2/Citas2';
import { AdminProducts } from './Components/Pages/AdminProducts/AdminProducts';
import { EmployeeRegister } from './Components/EmployeeRegister/EmployeeRegister';
import { UserList } from './Components/UserList/UserList';
import { AdminEmployees } from './Components/Pages/AdminEmployees/AdminEmployees';
import ChatBot from './Components/ChatBot/ChatBot';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Router>
      <div className='bgImg sm:w-[57rem] lg:w-[100vw]'>
        <Routes>
          {/* Pages */}
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Record />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/products" element={<ProductsShop />} />
          <Route path="/petHistory" element={<PetHistory />} />
          <Route path="/petRegister" element={<PetRegister />} />

          <Route path="/admin/usersList" element={<UserList />} />
          <Route path="/admin/productList" element={<AdminProducts />} />
          <Route path="/admin/registerEmployee" element={<EmployeeRegister />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />

          <Route path="/citas" element={<Citas2 />} />
          <Route path="/bot" element={<ChatBot />} />

          {/* Services */}
          <Route path="/peluqueria" element={<HairSalon title='Peluqueria' description='En la peluquería ofrecemos un servicio integral.' />} />
          <Route path="/baño" element={<Bathroom title='Baño' description='El baño no es solo una simple limpieza.' />} />
          <Route path="/guarderia" element={<PetDaycare title='Guarderia' description='La guardería canina va más allá del simple cuidado.' />} />
          <Route path="/consulta" element={<GeneralInquiry title='Consulta' description='La consulta general veterinaria va más allá.' />} />
        </Routes>
      </div>

      <Footer/>
    </Router>
  );
}

export default App;

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

function App() {
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
          {/* Services */}
          <Route path="/peluqueria" element={<HairSalon title='Peluqueria' description='Enla peluqueria ofrecemos un servicio integral que va más allá de la estética, promoviendo la salud y el bienestar general de tu peludo amigo. A diferencia de una peluquería canina tradicional, la peluquería veterinaria cuenta con la ventaja de estar supervisada por profesionales de la salud animal, quienes pueden detectar y prevenir posibles problemas de salud durante el proceso de aseo.' />} />

          <Route path="/baño" element={<Bathroom title='Baño' description='El baño no es solo una simple limpieza, sino una experiencia completa de bienestar y cuidado para tu peludito amigo. Imagina un spa para mascotas donde tu perro o gato recibe un tratamiento personalizado que lo deja no solo limpio y con un pelaje brillante, sino también relajado y feliz.' servicio='' />} />

          <Route path="/guarderia" element={<PetDaycare title='Guarderia' description=' la guardería canina de tu veterinaria de confianza, nos apasiona ir más allá del simple cuidado de mascotas. Creemos que la estadía de tu perro en nuestra guardería debe ser una experiencia positiva y enriquecedora que fortalezca su bienestar físico, mental y emocional.' />} />

          <Route path="/consulta" element={<GeneralInquiry title='consulta' description='La consulta general veterinaria va más allá de un simple chequeo. Es una oportunidad para establecer una relación de confianza con un profesional de la salud animal, obtener información valiosa sobre el bienestar de tu mascota y crear un plan preventivo personalizado para garantizar una vida larga y saludable.' />} />
          

        </Routes>
      </div>
      <Footer/>
    </Router>

   
  );

  

}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Pages/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import { Record } from './Components/Pages/Record/Record';
import { Footer } from "./Components/Layouts/Footer/Footer";
import { Review } from "./Components/Pages/Review/Review";
import './App.css'
import { Profile } from './Components/Pages/Profile/Profile';


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

          {/* Services */}
          <Route path="/peluqueria" element={<Review title='Peluqueria' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/baño" element={<Review title='Baño' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/guarderia" element={<Review title='Guarderia' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />

          <Route path="/consulta" element={<Review title='Consulta' description=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nostrum delectus ad ducimus, nam tenetur. Enim cumque eveniet quae soluta dolorem quia impedit rem sapiente totam tenetur in, architecto quo.' />} />
          
        </Routes>
      </div>
      <Footer/>
    </Router>

   
  );

}

export default App;

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import Home from './components/Home'
import Datejust126334 from './components/Datejust126334'
import Datejust126234 from './components/Datejust126234'
import Navigation from './components/Navigation';


function App() {
  return (
    <BrowserRouter>


    <Routes>
      <Route exact ={true} path="/" element={<Home />} />
      <Route exact ={true} path="datejust/126334" element={<Datejust126334 />} />      
      <Route exact ={true} path="datejust/126234" element={<Datejust126234 />} />            

    </Routes>

    </BrowserRouter>
  );
}

export default App;

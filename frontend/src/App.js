import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import Home from './components/Home'
import Watch from './components/Watch'


function App() {
  return (
    <BrowserRouter>


    <Routes>
      <Route exact ={true} path="/" element={<Home />} />
      <Route exact ={true} path="watch" element={<Watch />} />              

    </Routes>

    </BrowserRouter>
  );
}

export default App;

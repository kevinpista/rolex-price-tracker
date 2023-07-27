import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import Home from './components/Home'
import { Helmet } from 'react-helmet-async';


function App() {
  return (
    <>
    <Helmet>
    <link rel="icon" type="image/svg+xml" href="{% static 'favicon.svg' %}" />
  </Helmet>
    <BrowserRouter>
      <Routes>
        <Route exact ={true} path="/" element={<Home />} />              
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

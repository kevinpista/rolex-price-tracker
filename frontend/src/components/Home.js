import React from "react";
import watch126334 from '../static/126334.jpg';
import Figure from 'react-bootstrap/Figure';

/* import 1262334-2 from '../static/126334-2.jpg' */


// format is from react carousel class

const Home = () => {
    return (
      
    <Figure>
      <Figure.Image
        width={325}
        height={325}
        alt="300x300"
        src={watch126334}
      />
      <Figure.Caption className='caption'>
        Rolex Datejust 41 mm Ref. #126334
      </Figure.Caption>
    </Figure>

  
    );
  };

export default Home;

/*
<div className="watch-grid">
<div className="watch-product">
  <img src={watch126334} alt="Watch" />
  <div className="watch-stats">
    <p>Market Price: $100</p>
    <p>Material: Stainless Steel</p>
    <p>Dial Type: Analog</p>
  </div>
</div>
</div>

*/
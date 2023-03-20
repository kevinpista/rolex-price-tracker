import React, { useState, useEffect} from "react";
import watch126334 from '../static/126334.jpg';
import Figure from 'react-bootstrap/Figure';
import "../Datejust2.css";


const Datejust126234 = () => {

    const[avgprice, setAvgPrice] = useState(null);

    useEffect(() =>{

        let mounted = true;
        getAvgPrice(#BACKENDCALL).then(data => {
            if(mounted) {
                setAvgPrice(data)
            }
        })
        return () => mounted = false;
    }, [])


    return (
        <div>
        <div className="top-container">
          <div className="left-section">
        <Figure className='figure'>
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
          </div>
          <div className="right-section">
        <Figure className='figure'>
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
          </div>
        </div>

        <div>
            <h3 className ="centered-heading">
                Watch Info
            </h3>
        </div>

        <div className="bottom-container">

          <div className="left-section">
            <table>
              <thead>

              </thead>
              <tbody>
                <tr>
                  <td><strong>Brand</strong></td>
                  <td>Rolex</td>

                </tr>
                <tr>
                  <td><strong>Model</strong></td>
                  <td>Datejust</td>

                </tr>
                <tr>
                  <td><strong>Reference Number</strong></td>
                  <td>126234</td>
                </tr>
                <tr>
                  <td><strong>Bezel Material</strong></td>
                  <td>White Gold</td>
                </tr>
                <tr>
                  <td><strong>Case Material</strong></td>
                  <td>Oyster Steel</td>
                </tr>
                <tr>
                  <td><strong>Current Avg. Market Price</strong></td>
                  <td>$14,468 -- DYNAMIC</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="right-section">
            <table>
              <thead>

              </thead>
              <tbody>
                <tr>
                  <td><strong>Bezel</strong></td>
                  <td>Smooth</td>
                </tr>
                <tr>
                  <td><strong>Case Diameter</strong></td>
                  <td>41 mm</td>
                </tr>
                <tr>
                  <td><strong>Movement</strong></td>
                  <td>Automatic</td>
                </tr>
                <tr>
                  <td><strong>Power Reserve</strong></td>
                  <td>70 hours</td>
                </tr>
                <tr>
                  <td><strong>Dial Colors Options</strong></td>
                  <td>7</td>
                </tr>
                <tr>
                  <td><strong>Bracelet Options</strong></td>
                  <td>Oyster / Jubilee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  
    );
  };

export default Datejust126234;


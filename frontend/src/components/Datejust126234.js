import React, { useState, useEffect} from "react";
import watch126334 from '../static/126334.jpg';
import Figure from 'react-bootstrap/Figure';
import "../Datejust2.css";
import { getAvgPrice } from '../api/price'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

const currencyFormatter = (value) => `$${value.toLocaleString()}`;

{/* test data to visualizen chart */}
const data = [
  { name: 'Jan 23', price: 14200 },
  { name: 'Feb 23', price: 15325 },
  { name: 'Mar 23', price: 15823 },
];

const Datejust126234 = () => {

    const[avgprice, setAvgPrice] = useState(null);

    useEffect(() =>{

        let mounted = true;
        getAvgPrice(126234).then(data => {
            if(mounted) {
                setAvgPrice(data.average_price)
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

          <LineChart width={600} height={350} data={data}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" padding={{ left: 50, right: 50}} />
              <YAxis tickFormatter={currencyFormatter} domain={['auto', 'dataMax + 2000']} />
              <Tooltip formatter={currencyFormatter}  />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#926f34" activeDot={{ r: 8, fill: '#926f34' }} dot={{ fill: '#926f34', strokeWidth: 2, r: 3 }} />
          </LineChart>


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
                  <td>{avgprice != null ? `$${Number(avgprice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ""}</td>
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


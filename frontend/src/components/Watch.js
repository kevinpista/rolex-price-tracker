import React, { useState, useEffect} from "react";
import watch126334 from '../static/126334.jpg';
import Figure from 'react-bootstrap/Figure';
import "../Watch.css";
import { getAvgPrice } from '../api/price'
import { getChartData } from '../api/chartdata'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { watch126234 } from "../static/productData";

const currencyFormatter = (value) => `$${value.toLocaleString()}`;

{/* test data to visualizen chart */}


// const data = JSON.parse(jsonData);

// const chartData = data.map(({ date, price }) => ({ name: date, price: Number(price) }));

const Watch = () => {
    const [selectedProduct, setSelectedProduct] = useState(watch126234);
    const [avgPrice, setAvgPrice] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() =>{

        let mounted = true;
        getAvgPrice(126234).then(data => {
            if(mounted) {
                setAvgPrice(data.average_price)
            }
        })
        return () => mounted = false;
    }, [])

    useEffect(() =>{

      let mounted = true;
      getChartData(126334, 30).then(data => {

        if(mounted) {
          const formattedData = data.map(item => {
            return {
              name: item.date,
              price: parseFloat(item.price)
            }

          })
              setChartData(formattedData)

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

          <LineChart width={600} height={350} data={chartData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" padding={{ left: 50, right: 50}} />
              <YAxis tickFormatter={currencyFormatter} scale = 'log' domain={['auto']} />
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
                  <td>{selectedProduct.brand}</td>

                </tr>
                <tr>
                  <td><strong>Model</strong></td>
                  <td>{selectedProduct.model}</td>

                </tr>
                <tr>
                  <td><strong>Reference Number</strong></td>
                  <td>{selectedProduct.referenceNumber}</td>
                </tr>
                <tr>
                  <td><strong>Bezel Material</strong></td>
                  <td>{selectedProduct.bezelMaterial}</td>
                </tr>
                <tr>
                  <td><strong>Case Material</strong></td>
                  <td>{selectedProduct.caseMaterial}</td>
                </tr>
                <tr>
                  <td><strong>Current Avg. Market Price</strong></td>
                  <td>{avgPrice != null ? `$${Number(avgPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ""}</td>
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
                  <td>{selectedProduct.bezel}</td>
                </tr>
                <tr>
                  <td><strong>Case Diameter</strong></td>
                  <td>{selectedProduct.caseDiameter}</td>
                </tr>
                <tr>
                  <td><strong>Movement</strong></td>
                  <td>{selectedProduct.movement}</td>
                </tr>
                <tr>
                  <td><strong>Power Reserve</strong></td>
                  <td>{selectedProduct.powerReserve}</td>
                </tr>
                <tr>
                  <td><strong>Dial Colors Options</strong></td>
                  <td>{selectedProduct.dialColorOptions}</td>
                </tr>
                <tr>
                  <td><strong>Bracelet Options</strong></td>
                  <td>{selectedProduct.braceletOptions}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  
    );
  };

export default Watch;


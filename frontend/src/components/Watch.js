import React, { useState, useEffect} from "react";
import Figure from 'react-bootstrap/Figure';
import Nav from 'react-bootstrap/Nav';
import "../Watch.css";
import Navigation from "./Navigation";
import { getAvgPrice } from '../api/price'
import { getChartData } from '../api/chartdata'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { watch126234, watch126334, watch126200, watch126300 } from "../static/productData";


const currencyFormatter = (value) => `$${value.toLocaleString()}`;

const Watch = () => {
    const [selectedWatch, setSelectedWatch] = useState(watch126334);
    const [avgPrice, setAvgPrice] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [chartRange, setChartRange] = useState(1095);
    const [selectedChartRange, setSelectedChartRange] = useState('1095'); // To underline current chart range selection

    // Calculates a 10% padding to our Linechart's Y-Axis based on current chart data
    const getYAxisDomain = () => {
      if (!chartData) {
        return [0, 1];
      }
  
      const prices = chartData.map((item) => item.price);
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
  
      const padding = Math.max((maxPrice - minPrice) * 0.1, 1); // Default 10%, but sets a minimum axis price padding of 1
  
      return [minPrice - padding, maxPrice + padding];
    };
  

    const handleSelectWatch = (watch) => {
      setSelectedWatch(watch);
    };

    const handleChartRange = (days) => {
      setChartRange(days);
      setSelectedChartRange(days.toString()); // Days was passed and converted by handleChartRange to an int, so we convert back to string
    };

    useEffect(() =>{

      let mounted = true;
      getChartData(selectedWatch.referenceNumber, chartRange).then(data => {

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
  }, [selectedWatch, chartRange])


  useEffect(() =>{

    let mounted = true;
    getAvgPrice(selectedWatch.referenceNumber).then(data => {
        if(mounted) {
            setAvgPrice(data.average_price)
        }
    })
    return () => mounted = false;
}, [selectedWatch])
  
    return (
        <div>

          <Navigation
              watches={{watch126234, watch126334, watch126200, watch126300}}
              handleSelectWatch={handleSelectWatch}
              selectedWatch={selectedWatch}
          />

        <div className="top-container">
          <div className="left-section">
        <Figure className='figure'>
            <Figure.Image
                width={390}
                height={390}
                alt="300x300"
                src={selectedWatch.image}
            />
            <Figure.Caption className='caption'>
                {selectedWatch.imageCaption}
            </Figure.Caption>
        </Figure>
        <div class ='price-box-container'>
            <h3 className ="price-box">
             Avg. Market Price: {avgPrice != null ? `$${Number(avgPrice).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}` : ""}
            </h3>
        </div>
          </div>

          <div className="right-section">

          <div>
            <h4 className ="chart-heading">
            Market Price Performance
            </h4>
          </div>

          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="2 2" />
              
              <XAxis dataKey="name" angle={0} textAnchor="middle" dy={10}/>
              <YAxis tickFormatter={currencyFormatter} scale="log" domain={getYAxisDomain()} width={69} dx={-5}/>
              <Tooltip formatter={currencyFormatter}  />

              <Line type="monotone" dataKey="price" stroke="#926f34" activeDot={{ r: 8, fill: '#926f34' }} dot={{ fill: '#926f34', strokeWidth: 2, r: 3 }} />
              
          </LineChart>
          </ResponsiveContainer>

          <div className="nav-container">
          <Nav className="mr-auto" activeKey={selectedChartRange} onSelect={handleChartRange} style={{marginTop: '17px'}}>
            <Nav.Item>
              <Nav.Link eventKey="1095" active={selectedChartRange === "1095"}>3 Years</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="365" active={selectedChartRange === "365"}>1 Year</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="180" active={selectedChartRange === "180"}>6 Months</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="90" active={selectedChartRange === "90"}>3 Months</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="30" active={selectedChartRange === "30"}>1 Month</Nav.Link>
            </Nav.Item>
          </Nav>
          </div>

          </div>

        </div>

        <div >
          <h4 class ='table-heading'>
             <u>Watch Info</u>
           </h4>
        </div>

        <div className="bottom-container">

          <div className="left-table-section">
            <table className='info-table'>
              <thead>

              </thead>
              <tbody>
                <tr>
                  <td><strong>Brand</strong></td>
                  <td>{selectedWatch.brand}</td>

                </tr>
                <tr>
                  <td><strong>Model</strong></td>
                  <td>{selectedWatch.model}</td>

                </tr>
                <tr>
                  <td><strong>Reference Number</strong></td>
                  <td>{selectedWatch.referenceNumber}</td>
                </tr>
                <tr>
                  <td><strong>Bezel Material</strong></td>
                  <td>{selectedWatch.bezelMaterial}</td>
                </tr>
                <tr>
                  <td><strong>Case Material</strong></td>
                  <td>{selectedWatch.caseMaterial}</td>
                </tr>
                <tr>
                  <td><strong>Current Avg. Market Price</strong></td>
                  <td>{avgPrice != null ? `$${Number(avgPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ""}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="right-table-section">
            <table className='info-table'>
              <thead>

              </thead>
              <tbody>
                <tr>
                  <td><strong>Bezel</strong></td>
                  <td>{selectedWatch.bezel}</td>
                </tr>
                <tr>
                  <td><strong>Case Diameter</strong></td>
                  <td>{selectedWatch.caseDiameter}</td>
                </tr>
                <tr>
                  <td><strong>Movement</strong></td>
                  <td>{selectedWatch.movement}</td>
                </tr>
                <tr>
                  <td><strong>Power Reserve</strong></td>
                  <td>{selectedWatch.powerReserve}</td>
                </tr>
                <tr>
                  <td><strong>Dial Colors Options</strong></td>
                  <td>{selectedWatch.dialColorOptions}</td>
                </tr>
                <tr>
                  <td><strong>Bracelet Options</strong></td>
                  <td>{selectedWatch.braceletOptions}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  
    );
  };

export default Watch;


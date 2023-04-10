import React, { useState, useEffect} from 'react';
import Figure from 'react-bootstrap/Figure';
import Nav from 'react-bootstrap/Nav';
import '../css/Watch.css';
import WatchInfoTable from './WatchInfoTable';
import Navigation from './Navigation';
import Sidebar from './Sidebar'
import { getAvgPrice } from '../api/price'
import { getChartData } from '../api/chartdata'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { watch126234, watch126334, watch126200, watch126300 } from '../static/productData';


const currencyFormatter = (value) => `$${value.toLocaleString()}`;

const Home = () => {
  const [selectedWatch, setSelectedWatch] = useState(watch126334);
  const [avgPrice, setAvgPrice] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartRange, setChartRange] = useState(1095);
  const [selectedChartRange, setSelectedChartRange] = useState('1095'); // To underline current chart range selection; '3 Years' Default

  const handleSelectWatch = (watch) => {
    setSelectedWatch(watch);
  };

  const handleChartRange = (days) => {
    setChartRange(days);
    setSelectedChartRange(days.toString()); // Days was passed and converted by handleChartRange to an int, so we convert back to string
  };
  
  // API call for average market price
  useEffect(() =>{
    let mounted = true;
    getAvgPrice(selectedWatch.referenceNumber).then(data => {
      if(mounted) {
        setAvgPrice(data.average_price)
      }
    });
    return () => mounted = false;
  }, [selectedWatch]);

  // API call for chart data points
  useEffect(() =>{
    let mounted = true;
    getChartData(selectedWatch.referenceNumber, chartRange).then(data => {
      if(mounted) {
        const formattedData = data.map(item => {
          return {
            name: item.date,
            price: parseFloat(item.price)
          }
        });
        setChartData(formattedData);
      }
    });
    return () => mounted = false;
  }, [selectedWatch, chartRange]);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="recharts-default-tooltip" style={{border: '2px solid #ccc', backgroundColor: '#fff', padding: '10px'}}>
          <p className="label" style={{marginBottom: '5px', color: '#666'}}>{`${label}`}</p>

            {payload.map((item, index) => (
              <p key={index} className="item" style={{color: item.color, margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                {`Price: ${currencyFormatter(item.value)}`}
              </p>
            ))}
        </div>
      );
    }
    return null;
  };

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

  const renderPercentageChange = () => {
    if (!chartData) {
      return null;
    }
    
    const chartFirstPricePoint = chartData[0].price;
    const chartLastPricePoint = chartData[chartData.length - 1].price;
    const percentChange = getPercentageChange(chartFirstPricePoint, chartLastPricePoint);
    const colorChange = percentChange > 0 ? {color: 'green'} : {color: 'red'};

    return (
      <div className='percentage-change' style={colorChange}>
        {percentChange > 0 ? '+' : ''}{percentChange}%
      </div>
    );
  };

  const getPercentageChange = (startPrice, endPrice) => {
    const difference = endPrice - startPrice;
    const percentChange = (difference / startPrice) * 100;
    return percentChange.toFixed(2); // Rounds to 2 decimal places
  };
  
///// RENDER

  return (
    <div>
      <Navigation/>
      
      <div className='parent-container'>
        <Sidebar 
          watches={{watch126234, watch126334, watch126200, watch126300}}
          handleSelectWatch={handleSelectWatch}
          selectedWatch={selectedWatch}
          />

        <div className='main-content'>
          <div className='top-container'>

            <div className='figure-section'>
              <Figure className='figure'>
                <Figure.Image
                    width={390}
                    height={390}
                    alt='300x300'
                    src={selectedWatch.image}
                />
                <Figure.Caption className='caption'>
                    {selectedWatch.imageCaption}
                </Figure.Caption>
              </Figure>
              <div className ='price-box-container'>
                  <h3 className ='price-box'>
                    Avg. Market Price: {avgPrice != null ? `$${Number(avgPrice).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}` : ''}
                  </h3>
              </div>
            </div>

            <div className='chart-section'>
              <div>
                <h4 className ='chart-heading'>
                Market Price Performance
                </h4>
              </div>
              <ResponsiveContainer width='100%' height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray='2 2' />
                  <XAxis dataKey='name' angle={0} textAnchor='middle' dy={10}/>
                  <YAxis tickFormatter={currencyFormatter} scale='log' domain={getYAxisDomain()} width={69} dx={-5}/>
                  <Tooltip formatter={currencyFormatter} wrapperStyle={{outline: "none"}}  content={<CustomTooltip />} />
                  <Line type='monotone' dataKey='price' stroke='#926f34' activeDot={{ r: 8, fill: '#926f34' }} dot={{ fill: '#926f34', strokeWidth: 2, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className='nav-container'>
                <Nav className='mr-auto' activeKey={selectedChartRange} onSelect={handleChartRange} style={{marginTop: '17px'}}>
                  <Nav.Item>
                    <Nav.Link eventKey='1095' active={selectedChartRange === '1095'}>3 Years</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='365' active={selectedChartRange === '365'}>1 Year</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='180' active={selectedChartRange === '180'}>6 Months</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='90' active={selectedChartRange === '90'}>3 Months</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='30' active={selectedChartRange === '30'}>1 Month</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className='percentage-change-container'>
                Percentage Change:&nbsp; {renderPercentageChange()}
              </div>
            </div>
          </div>

          <div className='table-heading-container'>
            <h4 className='table-heading'>
                <u>Watch Info</u>
              </h4>
          </div>
          <div className='bottom-container'>
            <WatchInfoTable selectedWatch={selectedWatch} avgPrice={avgPrice} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;


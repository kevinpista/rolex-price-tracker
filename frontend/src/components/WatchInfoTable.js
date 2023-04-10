import '../css/WatchInfoTable.css';
import React from 'react';


const WatchInfoTable = ({ selectedWatch, avgPrice }) => {
  return (
    <div className='info-table-container'>

      <div className='left-table-section'>
        <table className='info-table'>
          <thead></thead>
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
              <td>{avgPrice != null ? `$${Number(avgPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='right-table-section'>
        <table className='info-table'>
          <thead></thead>
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
  );
};

export default WatchInfoTable;

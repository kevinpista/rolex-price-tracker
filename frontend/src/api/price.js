import axios from 'axios';

// Fetches the average market price. 
// API will average price data based on last 30 days.

export function getAvgPrice(ref_num) {
    const refNum = ref_num

    return axios.get('http://127.0.0.1:8000/avg-price/?ref_num=' + refNum)
    .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }
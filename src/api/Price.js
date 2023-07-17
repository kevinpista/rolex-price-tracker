import axios from 'axios';

// Fetches the average market price. 
// API will average price data based on last 30 days.

export function getAvgPrice(ref_num) {
    const refNum = ref_num

    return axios.get('https://my-rolex-price-tracker-bb86e7034531.herokuapp.com/api/avg-price/?ref_num=' + refNum)
    .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }
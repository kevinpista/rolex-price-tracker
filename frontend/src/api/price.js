import axios from 'axios';

export function getAvgPrice(ref_num) {
    const refNum = ref_num

    return axios.get('http://127.0.0.1:8000/avg-price/?ref_num=' + refNum)
    .then(response => {
        response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }
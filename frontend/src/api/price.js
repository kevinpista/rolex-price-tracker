import axios from 'axios';

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




export function getChartData(ref_num, interval_days) {
    const refNum = ref_num
    const intervalDays = interval_days

    return axios.get('http://127.0.0.1:8000/chart-data/?ref_num=' + refNum + '&?interval_days=' + intervalDays)
    .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }
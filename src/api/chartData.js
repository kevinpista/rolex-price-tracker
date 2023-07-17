import axios from 'axios';

// Fetch data from DB to use for charts

export function getChartData(ref_num, interval_days) {
    const refNum = ref_num
    const intervalDays = interval_days

    return axios.get('https://my-rolex-price-tracker-bb86e7034531.herokuapp.com/chart-data/?ref_num=' + refNum + '&interval_days=' + intervalDays)
    .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }

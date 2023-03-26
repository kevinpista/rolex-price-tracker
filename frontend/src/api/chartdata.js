import axios from 'axios';

// fetch data from DB to use for charts
// intervals for now will be shown as 1 month on front end
// but will be passed as "30 days"
export function getChartData(ref_num, interval_days) {
    const refNum = ref_num
    const intervalDays = interval_days

    return axios.get('http://127.0.0.1:8000/chart-data/?ref_num=' + refNum + '&interval_days=' + intervalDays)
    .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    }

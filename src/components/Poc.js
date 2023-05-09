import { Line } from "react-chartjs-2";
import trainingData from './training.csv';
import predictionData from './predictions.csv';
import './Poc.css'
import Papa from 'papaparse';
import { useEffect, useState } from "react";
import { CSVLink } from 'react-csv';
// import csvtojson from 'csvtojson';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x-axis
  LinearScale, // y-axis
  PointElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function toJson(fileName) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileName, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete (results, fileName) {
        resolve(results)
      },
      error (err, fileName) {
        reject(err)
      }
    })
  })
}

function prepTrainData(trainData) {
  let trainPeriod = [];
  let trainVolm = [];
  let array = [];
  let obj = {period: [], volm: []};

  const x = trainData.data.map((item, index) => [item['Month End Date']]);
  const y = trainData.data.map((item, index) => [item['BATF Volume TY']]);
  for(let i=0;i<x.length;i++) {
    trainPeriod.push(x[i][0]);
    array.push(i);
  }
  for(let j=0;j<y.length;j++) {
    trainVolm.push((y[j][0]));
  } 
  obj.period = trainPeriod;
  obj.volm = trainVolm;
  return obj;
}

function prepPredData(predData) {
  let array = [];
  let obj = {period: [], pred_col: [], actual: [], forecast: [], model: [], brand_name: []};
  
  let objArima = {period: [], pred_col: [], actual: [], model: []};
  let objProphet = {period: [], pred_col: [], actual: [], model: []};
  let objNbeats = {period: [], pred_col: [], actual: [], model: []};
  let objETS = {period: [], pred_col: [], actual: [], model: []};
  let preObj = {objArima: objArima, objProphet: objProphet, objNbeats: objNbeats, objETS: objETS};

  const date = predData.data.map((item, index) => [item['Month End Date']]);
  const pred_col = predData.data.map((item, index) => [item['predicted_col']]);
  const actual = predData.data.map((item, index) => [item['Actual']]);
  const forecast = predData.data.map((item, index) => [item['Forecast']]);
  const model = predData.data.map((item, index) => [item['model']]);
  const brand_name = predData.data.map((item, index) => [item['brand_name']]);

  for(let i=0;i<date.length;i++) {
    obj.period.push(date[i][0]);
    obj.pred_col.push((pred_col[i][0]));
    array.push(i);
  }
  for(let i=0;i<array.length;i++) {
    if (forecast[i][0] === "test") {
      
      if(model[i][0] === "AutoARIMA") {
        preObj.objArima.period.push(date[i][0]);
        preObj.objArima.pred_col.push(pred_col[i][0]);
        preObj.objArima.actual.push(actual[i][0]);
        preObj.objArima.model.push(model[i][0]);
      } else if (model[i][0] === "Prophet") {
        preObj.objProphet.period.push(date[i][0]);
        preObj.objProphet.pred_col.push(pred_col[i][0]);
        preObj.objProphet.actual.push(actual[i][0]);
        preObj.objProphet.model.push(model[i][0]);
      } else if (model[i][0] === "NBeats") {
        preObj.objNbeats.period.push(date[i][0]);
        preObj.objNbeats.pred_col.push(pred_col[i][0]);
        preObj.objNbeats.actual.push(actual[i][0]);
        preObj.objNbeats.model.push(model[i][0]);
      } else {
        preObj.objETS.period.push(date[i][0]);
        preObj.objETS.pred_col.push(pred_col[i][0]);
        preObj.objETS.actual.push(actual[i][0]);
        preObj.objETS.model.push(model[i][0]);
      }
    }
  }
  return preObj;
}

function Poc() {

  const [trainchartData, trainsetChartData] = useState({
    datasets: []
  });
  const [trainchartOptions, trainsetChartOptions] = useState({});

  const [predChartData, setPredChartData] = useState({
    datasets: []
  });
  const [predOptionsData, setPredOptionsData] = useState({});

  const [a, seta] = useState(false);
  const [b, setb] = useState(false);
  const [c, setc] = useState(false);
  const [d, setd] = useState(false);
  const [e, sete] = useState(false);

  const [count, setCount] = useState(0);

  const [userData, setUserData] = useState([]);

  // toggle function
  const toggleA = () => {
    seta((prevState) => !prevState);
    setCount(count + 1);
  }

  const toggleB = () => {
    setb((prevState) => !prevState);
    setCount(count + 1);
  }

  const toggleC = () => {
    setc((prevState) => !prevState);
    setCount(count + 1);
  }

  const toggleD = () => {
    setd((prevState) => !prevState);
    setCount(count + 1);
  }
 
  const toggleE = () => {
    sete((prevState) => !prevState);
    setCount(count + 1);
  }

  useEffect(() => {

    async function train() {
      try {
        const trainData = await toJson(trainingData);
        // console.log(predData)

        const trainObj = prepTrainData(trainData);

        const trainPeriod = trainObj.period;
        const trainVolm = trainObj.volm;


      trainsetChartData({
        labels: trainPeriod,
        datasets: [
          {
            label: "Training",
            data: trainVolm,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            pointRadius: 5
          }
        ]
      });
      trainsetChartOptions({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
              display: true,
              text: 'Average Valence Emotion Score of each Day (Filter to choose From which Day To which Day)',
              font: {
                size: 17
              }
          }
        }
      });
      } catch (err) {
        console.error('Could not parse json', err)
      }
    }
    train();
  }, []);


  useEffect(() => {

    async function pred() {
      try {
        const predData = await toJson(predictionData);
        

        const userres = predData.data;
        setUserData(userres);
        console.log(userres);


        const predObj = prepPredData(predData);

        const predAutoArimaPeriod = predObj.objArima.period;
        const predAutoARIMAval = predObj.objArima.pred_col;
        const predProphetval = predObj.objProphet.pred_col;
        const predNBeatsval = predObj.objNbeats.pred_col;
        const predETSval = predObj.objETS.pred_col;

        const predAutoArimaPActual = predObj.objArima.actual;


        console.log(predAutoARIMAval);

        const lineDataArray = [
          {
            label: "AutoARIMA",
            data: predAutoARIMAval,
            fill: false,
            backgroundColor: "rgba(12,102,192,0.2)",
            borderColor: "#F48F57",
            pointRadius: 5
          },
          {
            label: "Prophet",
            data: predProphetval,
            fill: false,
            borderColor: "#45379B",
            pointRadius: 5
          },
          {
            label: "NBeats",
            data: predNBeatsval,
            fill: false,
            borderColor: "#E66B9D",
            pointRadius: 5
          },
          {
            label: "ETS",
            data: predETSval,
            fill: false,
            borderColor: "#934E9F",
            pointRadius: 5
          },
          {
            label: "Actual",
            data: predAutoArimaPActual,
            fill: false,
            borderColor: "#2097B7",
            pointRadius: 5
          }
        ]

      let chartArray = [];
      
      if(a) {
        chartArray.push(lineDataArray[0]);
      }
      if(b) {
        chartArray.push(lineDataArray[1]);
      }
      if(c) {
        chartArray.push(lineDataArray[2]);
      }
      if(d) {
        chartArray.push(lineDataArray[3]);
      }
      if(e) {
        chartArray.push(lineDataArray[4]);
      }
      console.log(chartArray)
        
        
      setPredChartData({
        labels: predAutoArimaPeriod,
        datasets: chartArray
      });
      setPredOptionsData({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
              display: true,
              text: 'POC Chart Data',
              font: {
                size: 17
              }
          }
        }
      });
      } catch (err) {
        console.error('Could not parse json', err)
      }
    }
    pred();
  }, [count]);

  return (
    <div className="App">
    <h1>React_POC</h1>
      <div style = {
        {
          width: '600px',
          height: '300px'
        }
      }>
        <CSVLink data={userData} 
        className="w-40 grow f4 link ph3 pv2 dib white bg-light-purple">
            Export To Excel
        </CSVLink>
        <Line
          data = {trainchartData}
          options = {trainchartOptions}
        ></Line>
          <div className='center'>
            <div className='form center pa4 br3'>
              {/* <input 
              className='f4 pa2 w-25 center' 
              type='tex' 
              placeholder='From' 
              style={{fontSize: '15px'}} 
              onChange={changeFromValenceFilter} 
              />
              <input 
              className='f4 pa2 w-25 center' 
              type='tex' 
              placeholder='To' 
              style={{fontSize: '15px'}} 
              onChange={changeToValenceFilter}
              /> */}
              <button
                style={{fontSize: '15px'}}
                className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={toggleA}
              >AutoArima</button>
              <button
                style={{fontSize: '15px'}}
                className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={toggleB}
              >Prophet</button>
              <button
                style={{fontSize: '15px'}}
                className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={toggleC}
              >NBeats</button>
              <button
                style={{fontSize: '15px'}}
                className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={toggleD}
              >ETS</button>
              <button
                style={{fontSize: '15px'}}
                className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={toggleE}
              >Actual</button>
            </div>
          </div>
        <Line
          data = {predChartData}
          options = {predOptionsData}
        ></Line>
      </div>
    </div>
  );
}

export default Poc;

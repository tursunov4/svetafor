import { useState } from "react"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  

  
  import { Bar } from "react-chartjs-2";
  import "./statis.css"
  
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  )
  


const Statis = () => {
    const[data,setData] = useState("")
    console.log(data);
    const statisData = {
        labels: ["Qibray","Bekobod",`Parkent`,`Olmaliq`,`Boka`,`Circiq`,`Oqqogon`],
        datasets: [
         {
          label:"Buzildi",
          data:[16,20,12,34,56,12,34,],
          backgroundColor:"#ff3e3eab",
          borderColor: "balck",
          borderRadius:10
    
         },
         {
          label:"Tuzatildi",
          data:[30,10,12,3,45,12,54],
          backgroundColor:"  #245effa2",
          borderColor: "balck",
          borderRadius:10
         },
    
        ]
      }
    
      const options = {
        plugins:{
         legend:{
            labels:{
              usePointStyle:true,
              pointStyle:`cricle`,
              font: {
                size: 18
            },
            },
         },
          tooltip:{
            fontSize: 18,
            padding: 10,
            backgroundColor: 'black',
         
          
           bodyFont:{
            "weight": "bold",
            "size": 18
           },
            titleFont: {
              "weight": "bold",
              "size": 20
            }
          }
        },
          scales: {
            y: {
              ticks: {
                color: 'black',
                font: {
                  size: 19,
                }
              }
            },
            x: {
              ticks: {
                color: 'black',
                font: {
                  size: 19
                }
              }
            }
          },
     
      }
    
  return (
    <div className="container">
      <div className="statis-top">
         <div className="tablisa">
            <p className="diag" >Diagramma</p>
            <p>Tablitsa</p>
         </div>
         <div className="inut-date-con"> 
         <input className="from-date"   type="date"  onChange={(e) => setData(e.target.value)} /> 
         <input className="to-data"   type="date"  onChange={(e) => setData(e.target.value)}/> </div>
      </div>
      <div className="statis-header">
      <Bar    data= {statisData}  options={options}/>
      </div>
      
    </div>
  )
}

export default Statis
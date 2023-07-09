
import React, { useEffect, useState } from 'react'
import http from "../../axois"
import './region.css'
import { Link } from 'react-router-dom'




const Region = () => {
  const [regions, setRegions] = useState([])

  const regionfunc = () => {
    http.get("/regions").then(resdata => {
      console.log(resdata.data.data.regions);
      setRegions(resdata.data.data.regions)
    })
  }

  useEffect(() => {
    regionfunc()
  }, [])


  return (



    <div className='container'>
      <nav>

      </nav>
      <h2 className='region__title'>Tumanlar</h2>
      <div className='region__name-wrapper'>
        {regions && regions.map(item => {
          if (item.type === "tuman") {
            return (
              <Link key={item.id} to={`/singleregionsvet/${item.id}`} className='regions__name'>{item.name}</Link>
            )
          }
        })}
      </div>
      <h2 className='region__title'>Shaharlar</h2>
      <div className='region__name-wrapper'>

        {regions && regions.map(item => {
          if(item.type === "shahar"){
            return (
              <Link key={item.id} to={`/singleregionsvet/${item.id}`} className='regions__name'>{item.name}</Link>
            )
          }
        })}

      </div>
    </div>
  );
};

export default Region;

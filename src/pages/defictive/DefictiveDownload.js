import "./download.css"
import { useEffect, useState } from "react"
import downloadicon from '../../assets/svg/dowloadicon.svg'
import { useDownloadExcel } from "react-export-table-to-excel"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import http from "../../axois"
const DefictiveDownload = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [regions, setRegions] = useState([])
  const moth = sessionStorage.getItem('month')
  const year = sessionStorage.getItem('year')
  const tableref = useRef(null)
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: 'Nosoz-svetaforlar',
    sheet: 'UserData'
  })

  useEffect(() => {
    http.get('/regions').then((res) =>{
     console.log(res.data.data.regions[id])
      setRegions(res.data.data.regions)
    })
    http.get(`/region/unfix/${id}`)
      .then(res => setData(res.data.data.nosoz_svetaforlar))
  }, [id])
  console.log(data);
  return (
    <div className="defictive-download">
      <section className="header-section">
        <div className="container">
          <div className="header-wrapper">
            {/* <div className="select-wrapper">
                    <select name="" id="">
                        <option selected disabled>Yil ni tanlang</option>
                    </select>
                    <select name="" id="">
                    <option selected disabled>Oy ni tanlang</option>
                    </select>
                </div> */}
            {/* <div className="search-wrapper">
                  <label className="search-label" >
                      <div  className="img-icon__wrapper">
                      <img className="img-icon" src={search} alt="search icon" width={20} height={20} />
                      </div>
                     <input type="text" placeholder="Search by date name or ID " />
                  </label>
                 <ul className="route-decfictive">
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div> */}
          </div> 
        </div>
      </section>
      <section className="download-section">
        <div className="container">
          <div className="download-wrapper">
            <div className="download-text">
              <h3>{regions.name}| {year} yil | {moth} oyi royxati</h3>
              <button onClick={onDownload} >Yuklab olish <img src={downloadicon} alt="download-icon" /></button>
            </div>
            <table ref={tableref} >
              <thead className="head__table">
                <tr className="head__table">
                  <th className="table__No ">{year}</th>
                  <th className="table__info">Svetafor raqami</th>
                  <th className="table__info">Ko’cha nomi</th>
                  <th className="table__info">Zayafka tushgan sana</th>
                  <th className="table__info">Tuzatilgan sana</th>
                  <th className="th__description">Nima sababdan</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id_number}</td>
                    <td>{item.street}</td>
                    <td>{item.send_fix_date}</td>
                    <td>{item.fixed_date}</td>
                    <td>{item.broken_reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
export default DefictiveDownload
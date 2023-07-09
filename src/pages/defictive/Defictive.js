import "./defictive.css"
import search from '../../assets/svg/searchicon.svg'
import { Link } from "react-router-dom"
import http from "../../axois"
import { useState, useEffect } from "react"
const Defictive = () => {

    const [years, setYears] = useState()
    const [month, setMonth] = useState()
    const [data, setData] = useState([])
  
    // const monthNames = ["January", "February", "March","April","May" ];
    

  
    const date = new Date()
    const months = month ? month : `${date.getMonth() + 1}`
    const year = years ? years : date.getFullYear()
    sessionStorage.setItem('month', months)
    sessionStorage.setItem('year' , year)
    

    const handleSubmit = () => {
        http.post(`/regions/fixed-count`, {
            year: year,
            month: months.length === 1 ? `0${months}` : months
        }).then(res => {
            setData(res.data.data.regions)
            console.log(res.data.data.regions);
        }).catch((err) => {
            console.log(err)
        })
    }
  
   useEffect(() => {
    handleSubmit()
   },[months])


    return (
        <div className="defictive-main">

            <section className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="select-wrapper">
                            <select defaultValue={years}  onChange={(e) => setYears(e.target.value)} name="" id="">
                                <option disabled selected hidden>Yilni tanlash</option>
                                <option className="option__year">2022</option>
                                <option className="option__year">2023</option>
                            </select>
                            <select defaultValue={month}  onChange={(e) => setMonth(e.target.value)} name="" id="" >
                                <option disabled selected hidden  >Oyni tanlash</option>
                                <option value={"1"}>Dekabr</option>
                                <option value={"2"}>Yanvar</option>
                                <option value={"3"}>Fevral</option>
                                <option value={"4"}>Mart</option>
                                <option value={"5"}>Aprel</option>
                                <option value={"6"}>May</option>
                                <option value={"7"}>Iyun</option>
                                <option value={"8"}>Iyul</option>
                                <option value={"9"}>Avgust</option>
                                <option value={"10"}>Sentabr</option>
                                <option value={"11"}>Oktabr</option>
                                <option value={"12"}>Noyabr</option>
                            </select>
                        </div>
                        <div className="search-wrapper">
                            <label className="search-label" >
                                <div className="img-icon__wrapper">
                                    <img className="img-icon" src={search} alt="search icon" width={20} height={20} />
                                </div>
                                <input type="text" placeholder="Search by date name or ID " />
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <div className="body-section">
                <div className="container">
                    <div className="list-wrapper">
                        <div className="text-wrapper">
                            <h2>Tumanlar</h2>
                            <h4>Nosoz svetaforlar soni</h4>
                        </div>
                        <ul className="text-wrapper__list">
                            <>
                                {data && data.map((item) => {
                                    return (
                                        <Link className="download-link" to={`/defictive-download/${item.region_id}`}>
                                            <span className="chiziq"></span>
                                            <h3>{item.region}</h3>
                                            <h4>{item.count} dona</h4>
                                        </Link>
                                    )
                                })}
                            </>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Defictive
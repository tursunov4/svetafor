import React, { useState, useEffect } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import './SingleRegionSvet.css'
import search from '../../assets/svg/searchicon.svg'
import editicon from '../../assets/svg/Vector (1).svg'
import deleteicon from '../../assets/svg/Vector (2).svg'
import img from "../../assets/png/traffic-light.png";
import { useParams } from 'react-router-dom'
import http from '../../axois'
import { useContext } from 'react'
import { Rigister } from '../../contex/Contex'
import {
    YMaps,
    Map,
    ZoomControl,
    Placemark,
    FullscreenControl,
} from "@pbe/react-yandex-maps";


const defaultState = {
    center: [41.311151, 69.279737],
    zoom: 12,
    controls: [],
};

export default function SingleRegionSvet() {
    const token = useContext(Rigister)
    const [state, setState] = useState(1);
    const { id } = useParams()
    const [popup, setPop] = useState(false);
    const [data, setData] = useState([])
    const [trafficdata, setTraficData] = useState({})
    console.log(id);

    useEffect(() => {
        http.get(`/region/${id}`)
            .then(res => {
                console.log("wedewe",res.data.data.traffic_lights);
                setData(res.data.data.traffic_lights)
            })
    }, [id]);






    function fetchState(index) {
        setState(index)
    }
    const handleClickOpen = (id) => {
        console.log(id);

        http.get(`/traffic-light/${id}`)
            .then(res => setTraficData(res.data.data)
            )
        setPop(!popup);

    };
    console.log(trafficdata);
    const closePopup = () => {
        setPop(false);
        setTraficData({})
    };

   const tuzatishSubmit =() =>{
    http.post('/fix-request' , {
        created_by:token.token.id ,
       engineer_id: trafficdata.engineer_id,
       traffic_light_id: trafficdata.id-0,
       title :'dfdsf'
    }).then(res =>{
         console.log(res.data)
    })
   }


    return (
        <div className='container'>
            <input className='search__input' type="text" placeholder='Search by date name or ID'  />
            <button className='search__btn'>
                <img className='search__icon' src={search} alt="" />
            </button>

            <table>
                <thead>
                    <tr className='table-tr'>
                        <th className='table-th'>No:</th>
                        <th className='table-th'>Svetofor Raqami</th>

                        <th className='table-th'>Kocha nomi</th>
                        <th className='table-th'>Chaqiriq sanasi</th>
                        <th className='table-th'>Tuzatilgan sana</th>
                        <th className='table-th'></th>
                    </tr>
                </thead>
                <tbody>

                    {data && data.map((item, index) =>
                        <>
                            <tr key={item.id} className='table-tr'>
                                <td className='table-td'>{index + 1}</td>
                                <td className='table-td'>{item.id_number}</td>
                                <td className='table-td'>{item.street}</td>
                                <td className='table-td'>{item.send_fix_date}</td>
                                <td className='table-td'>{item.fixed_date}</td>
                                <td className='table-td'>
                                    <button className='table-td Zayavka__btn' onClick={() => handleClickOpen(item.id_number)}>Tuzatish</button>
                                </td>
                            </tr>
                        </>
                    )
                    }

                </tbody>
            </table>

            <div>
                {popup && trafficdata ? (
                    <div className='main'>
                        <div className='popup'>
                            <i onClick={closePopup} class="fa-solid fa-xmark">
                                <HiOutlineXMark />
                            </i>
                            <div className='main-wrapper'>
                                <div>
                                    <div className='mini-wrapper'>
                                        <img className='photo__traffic' src={trafficdata.image} alt="" />
                                        <span className='info__wrapper'>
                                            <h2 className='info__title'>Ma’lumotlar</h2>
                                            <h4 className='information'>Svetafor  raqami: -{trafficdata.id_number}</h4>
                                            <h4 className='information'>Kritilgan sanasi: -{trafficdata.created_at}</h4>
                                            <h4 className='information'>Joylashgan ko’chasi:-{trafficdata.street}</h4>
                                            <h4 className='information'>Xizmat korsatgan shaxs:-{trafficdata.first_name} {trafficdata.last_name}</h4>
                                            <h4 className='information'>Xizmat korsatgan shaxs ID si: - {trafficdata.engineerIDNumber}</h4>
                                        </span>
                                    </div>
                                    <div className='button__wrapper1'>
                                        <button className={state === 1 ? "tab-actived" : "tablo"} onClick={() => fetchState(1)}>Biografiya</button>
                                        <button className={state === 2 ? "tab-actived" : "tablo"} onClick={() => fetchState(2)}>Xujjat</button>
                                        <button className={state === 3 ? "tab-actived" : "tablo"} onClick={() => fetchState(3)}>Nosozlik Tarixi</button>
                                    </div>
                                    <div className='tab__contente'>
                                        <div className={state === 1 ? "content-actived" : "contente"}>
                                            <p>{trafficdata.description}</p>
                                        </div>
                                        <div className={state === 2 ? "content-actived" : "contente"}>
                                            <p>{trafficdata.document}</p>
                                        </div>
                                        <div className={state === 3 ? "content-actived" : "contente"}>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, fugiat impedit ipsum saepe nostrum eius explicabo quo consequuntur magni! Rem, nostrum cumque totam dolorum vero voluptatem esse quam porro! Laboriosam debitis in aliquid reiciendis consectetur vel officia doloremque deserunt maiores adipisci aperiam necessitatibus, fugiat praesentium tempore quia corporis expedita sapiente.</p>
                                        </div>
                                    </div>
                                    <button onClick={tuzatishSubmit} type='button' className='button__tuzatish'>Tuzatish</button>
                                </div>
                                <div>
                                  
                                {trafficdata.lat ? (
                                        <YMaps
                                        query={{
                                            apikey: "29294198-6cdc-4996-a870-01e89b830f3e",
                                            lang: "ru_RU",
                                        }}>
                                        <Map defaultState={{
                                            center: [+trafficdata.lat, +trafficdata.long],
                                            zoom: 15,
                                            controls: [],
                                        }} className='maps'>
                                            <FullscreenControl
                                                options={{
                                                    fullscreenenter: true,
                                                }}
                                            />
                                            <Placemark geometry={[trafficdata.lat, trafficdata.long]}
                                                options={
                                                    {
                                                        iconLayout: 'default#image',
                                                        iconImageHref: img
                                                    }
                                                }

                                            />
                                            <ZoomControl />
                                        </Map>
                                    </YMaps>
                                ) : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )

                }
            </div>
        </div>
    )
}

import "./addtraffic.css"
import {  useEffect, useState } from "react"
import search from '../../assets/svg/searchicon.svg'
import editicon from '../../assets/svg/Vector (1).svg'
import deleteicon from '../../assets/svg/Vector (2).svg'
import { HiOutlineXMark } from 'react-icons/hi2'
import { useContext } from "react"
import http from '../../axois'
import { Rigister } from "../../contex/Contex"
import { ToastContainer, toast } from 'react-toastify';

const Addtrafficlight =()=>{
    const {token} = useContext(Rigister)
    const notify = (text) => toast(`${text}`);
    const [popup, setPop] = useState(false);
    const [edit ,setEdit] = useState(false)
    const [regions , setRegions] = useState([])
    const [imageurl ,setImageurl] = useState('')
    const [tarficlist , setTraficlist ] = useState([])
    const [created_by , setCreated_by] = useState('')
    const [des , setDes] = useState('')
    const [id ,setId] = useState('')
    const [image , setImage] = useState('')
    const [lat , setLat] = useState('')
    const [long , setLong] = useState('')
    const [region , setRegion] = useState('')
    const [street , setStreet] = useState('')
    const [document , setDocument] = useState('')
    const [editId , setEditId] = useState('')
    if(image){
        let formData = new FormData()
        formData.append("file",image)
      
        http.post("/media/file-upload" , formData).then(res =>{
            notify("Rasm qo'shildi")
            console.log(res)
            setImageurl(res.data.data.url)
            setImage('')
            notify("Rasim yuklandi davom eting")
        })
    }

    useEffect(()=>{
        http.get('/traffic-light').then(res =>{
            console.log(res.data)
            setTraficlist(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
        http.get('/regions').then((res)=>{
            console.log(res.data.data.regions)
            setRegions(res.data.data.regions)
        })
    },[])
    const handleClickOpen = () => {
        setPop(!popup);
    };
    const closePopup = () => {
        setEdit(true)
        setPop(false);
         setId('')
        setDes('')
        setCreated_by('')
        setDocument('')
        setImage('')
        setLat('')
        setLong('')
        setRegion('')
        setStreet('')        

    };
    const submitTraffic =(e)=>{
              http.post('/traffic-light' ,{
                created_by: token.id,
                description: des,
                document: document,
                id_number: id,
                image: imageurl,
                lat: lat,
                long: long,
                region_id: region-0,
                street: street
              } ).then(res =>{
            if(res.status === 201){
                notify("Svetafor qo'shildi")
                setTimeout(() => {                    
                    window.location.reload()
                }, 1500);
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    const deletTraffic = (item)=>{
      if(item){
        fetch( `${process.env.REACT_APP_API}/traffic-light`,{
            method:"DELETE",
            body:JSON.stringify({
                deleted_by: token.id -0,
                id_number: `${item.id_number}`
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `${token.access_token}`
            }
        }).then(res => {
            res.json()
            if(res.status === 200){
                notify("Svetafor o'chirildi")
                setTimeout(() => {                    
                    window.location.reload()
                }, 1500);
            }
        })
      }
    }
    const editTraffic=(item)=>{
        setEditId(item.id)
        setId(item.id_number)
        setDes(item.description)
        setCreated_by(item.created_by)
        setDocument(item.document)
        setLat(item.lat)
        setLong(item.long)
        setRegion(item.region_id)
        setStreet(item.street)        
        setPop(true)
        setImageurl(item.image)
        setEdit(true)
    }
    const submitEdit =()=>{
        http.put('traffic-light' ,{
            updated_by:  token.id,
            description: des,
            document: document,
            id_number: id,
            image: imageurl,
            lat: lat,
            long: long,
            street: street,
            id:editId
        }).then((res)=>{
            if(res.status === 200){
                notify("Svetafor malumotlari yangiladi")
            setTimeout(() => {                    
                window.location.reload()
            }, 1500);
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return (
        <div className="addtraffic">
        <ToastContainer
          autoClose={1500}
        />
        <div className="container">
            
        <div className="text-addtrafficd">
         <h2>Svetafor qo’shish</h2>
          <div>
          <label className="search-labeld" >
                      <div  className="img-icon__wrapperd">
                      <img className="img-icond" src={search} alt="search icon" width={20} height={20} />
                      </div>
                     <input type="text" placeholder="Search by date name or ID " />
          </label>
          <button onClick={handleClickOpen}>Qo’shish +</button>
          </div>
         </div>
         <table className="addtraftable">
                <thead>
                    <tr className='table-tr'>
                        <th className='table-th'>No:</th>
                        <th className='table-th'>Svetofor Raqami</th>

                        <th className='table-th'>Kocha nomi</th>
                        <th className='table-th'>Tahrirlash</th>
                        <th className='table-th'>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tarficlist.map((item , index) =>(
                            
                    <tr key={index} className='table-tr'>
                        <td className='table-td'>{index +1}</td>
                        <td className='table-td'>{item.id_number}</td>
                        <td className='table-td'>{item.street}</td>
                        <td className='table-td'>
                            <img onClick={() => editTraffic(item)} className='icons' src={editicon} alt="" />
                        </td>
                        <td className='table-td'>
                            <img onClick={()=>deletTraffic(item)} className='icons' src={deleteicon} alt="" />
                        </td>
                       
                    </tr>
                        ))
                    }
                </tbody>
            </table>
            {popup ? (
                    <div className='main'>
                        <div className='popup'>
                            <i onClick={closePopup} class="fa-solid fa-xmark">
                                <HiOutlineXMark />
                            </i>
                <form  className="addtraffic-form">
                <ul className="addtraffic-title">
                    <li className="addtraffic-list">
                       <label htmlFor="tuman">Tumanlar ro’yxati</label>
                       <select  defaultValue={region} onChange={(e)=>setRegion(e.target.value)}  id="tuman">
                           <option disabled selected hidden value="">Tumanni tanlang</option>
                        {
                            regions.map((item , index) =>(
                                <option key={index} value={item.id}>{item.name} {item.type}</option>
                                ))
                            }
                            </select>
                       <label htmlFor="karta">Karta kordinatasi ‘’X’’</label>
                       <input defaultValue={lat} onChange={(e)=>setLat(e.target.value)} con id="karta" type="text" />
                       <label htmlFor="raqam">Svetafor raqami</label>
                       <input defaultValue={id}  onChange={(e)=>setId(e.target.value)} id="raqam" type="text" />
                       <label htmlFor="text">Izoh</label>
                       <textarea defaultValue={des} onChange={(e)=>setDes(e.target.value)} id="text"></textarea>
                    </li>
                    <li className="addtraffic-list">
                       <label htmlFor="joy">Joylashgan ko’chasi</label>
                       <input defaultValue={street} onChange={(e)=>setStreet(e.target.value)} id="joy" type="text" />
                      
                       <label htmlFor="kartay">Karta kordinatasi ‘’Y’’</label>
                       <input defaultValue={long}  onChange={(e)=>setLong(e.target.value)} id="kartay" type="text" />
                        <p>Rasm yuklash</p>
                        
                      
                        <div className="addtraffic__img-input">
                        <label className="imge-input" htmlFor="img">
                          <input  onChange={(e) =>setImage(e.target.files[0]) } id="img" type="file" />
                          <p>Rasm yuklash</p>
                         </label>
                        </div>
                         <div className="hujjat__wrapper">
                          <label  className="hujjat__labele" htmlFor="hujjat">Svetafor xujjati</label>
                         <textarea defaultValue={document} onChange={(e) => setDocument(e.target.value)}  id="hujjat" ></textarea>
                        </div>
                    </li>
                </ul>
                <div className="text">
             
               <div className="button__wrapperd">
                {
                    edit ?   <button onClick={(e)=>submitEdit(e)} type="button">Saqlash</button> :<button onClick={(e)=>submitTraffic(e)} type="button">Saqlash</button>
                }
               </div>
                
                </div>
            </form>
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
export default Addtrafficlight
import React, { useState } from 'react'
import './AddUser.css'
import plus from '../../assets/svg/+.svg'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import deleteicon from '../../assets/svg/Vector (2).svg'
import editicon from "../../assets/svg/editicon.svg";
import http from '../../axois'
import { Rigister } from "../../contex/Contex"
import { useEffect } from 'react';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




export default function AddUser() {
    const [updateid , setUpdateid] = useState('')
    const token = useContext(Rigister)
    const [edit , setEdit ] = useState(false)
    const [personName, setPersonName] = React.useState([]);
    const [tumanlar , setTuman]  = useState([])
    const [engineer ,setEnginer] = useState([])
    const [regionEnginer , setRegionEnginer] = useState([])
    const [name , setName] = useState('')
    const [famlya , setFamilya] = useState('')
    const [number , setNumber] = useState('')
    const [id ,setId] = useState('')
    const notify = (text) => toast(`${text}`);
    const [ruhsat ,setRuhsat] = useState(false)
    useEffect(()=>{
    http.get('/engineers').then(res =>{
        console.log(res.data.data.engineers)
        setEnginer(res.data.data.engineers)
    })
 
    http.get('/regions').then(res=>{
        setTuman(res.data.data.regions)
    })
    } , [])
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

   const handleChaked =(item)=>{
    setRegionEnginer([...regionEnginer, {region_id : item.id-0}])
   }

   const submitForm =()=>{

    if(name && famlya && number && id){
        http.post('/engineer' ,{
            created_by: token.token.id,
            first_name: name,
            last_name: famlya,
            role: ruhsat,
            pasport: id,
            phone: number,
            region_ids: regionEnginer,
            refresh_token: token.token.access_token ,
        }).then(res =>{
            if(res.status === 201){
                notify("Engineer qo'shildi")
                setTimeout(() => {                    
                    window.location.reload()
                }, 1500);
            }
        }).catch(err =>{
            console.log(err)
        })
    }else{
        notify("Hamma ma'lumotlar kiritilishi shart")
    }

   }
   const deleteEnginer =(id)=>{
    // console.log(id , token.token.id)
    // http.delete("/engineer"   ).then(res =>{
    //     if(res.status === 200){
    //         window.location.reload()
    //     }
    // }).catch(err =>{
    //     console.log(err)
    // })
    if(id){
        fetch(`${process.env.REACT_APP_API}/engineer`,{
            method:"DELETE",
            body:JSON.stringify({
                deleted_by: token.token.id -0,
                id:id
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `${token.token.access_token}`
            }
        }).then(res => {
            res.json()
            if(res.status === 200){
                notify("Engineer o'chirildi")
                setTimeout(() => {                    
                    window.location.reload()
                }, 1500);
            
                
            }
        })
        .then(data => console.log(data))
      }
   }
   const editEnginer = (item) =>{
    setName(item.first_name)
    setFamilya(item.last_name)
    setNumber(item.phone)
    setId(item.pasport)
    setUpdateid(item.id)
    setEdit(true)
    
   }
   const submitEdit=()=>{
    http.put('/engineer' , {
        
        first_name: name,
        id: updateid,
        last_name: famlya,
        pasport: id,
        phone: number,
        region_ids: regionEnginer,
        role: ruhsat,
        updated_by: token.token.id      
}).then((res) =>{
    if(res.status === 200){
        notify("Engineer malumotlari yangilandi")
        setTimeout(() => {                    
            window.location.reload()
        }, 1500);
    }
})
   }
    return (
        <div className='container'>
            <ToastContainer
              autoClose={1500}              
            />
            <h1 className='adduser__title'>Foydalanuvchi qo'shish</h1>
            <div className='inputs__wrapper'>
                <input defaultValue={name} onChange={(e) =>setName(e.target.value)} className='inputs' type="text" placeholder='Ism' />
                <input defaultValue={famlya} onChange={(e) =>setFamilya(e.target.value)} className='inputs' type="text" placeholder='Familiya' />
                <input defaultValue={number} onChange={(e) =>setNumber(e.target.value)} className='inputs' type="text" placeholder='Telefon raqam' />
                <input defaultValue={id} onChange={(e) =>setId(e.target.value)} className='inputs' type="text" placeholder='ID raqami' />
            
                <FormControl  sx={{ width: 300  }}>
                    <InputLabel  id="demo-multiple-checkbox-label">Tuman va Shaharlar</InputLabel>
                    <Select className='select__dropdown'
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}

                        MenuProps={MenuProps}
                    >
                        { tumanlar && tumanlar.map((item , index) => (

                            <MenuItem onClick={() =>handleChaked(item)} key={index} value={`${item.name} ${item.type}`}  >
                                <Checkbox checked={personName.indexOf(`${item.name} ${item.type}`) > -1} />
                                <ListItemText primary={`${item.name} ${item.type}`} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <label className='qushishruhsat'>
                    <p>Svetafor <br /> qo'shishga ruhsat</p>
                    <input defaultChecked={ruhsat} onChange={()=>setRuhsat(!ruhsat)} type="checkbox" />
                </label>
                {
                    edit ?   <button onClick={ submitEdit} className='input__btn'>Tahrirlash   
                </button> :
                  <button onClick={ submitForm } className='input__btn'>Qo’shish
                  <img src={plus} alt="plus" />
                  </button>
                }
             
            </div>
            <table>
                <thead>
                    <tr className='table-tr'>
                        <th className='table-th'>No</th>
                        <th className='table-th'>Ism</th>
                        <th className='table-th'>Familiya</th>
                        <th className='table-th'>Telefon raqam</th>
                        <th className='table-th'>ID raqami</th>
                        <th className='table-th'>Biriktirilgan tuman</th>
                        <th className='table-th'>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {

                      engineer && engineer.map((item, index) =>(

                            <tr key={index}>
                                 <td className='table-td'>{index + 1}</td>
                                 <td className='table-td'>{item.first_name}</td>
                                 <td className='table-td'>{item.last_name}</td>
                                 <td className='table-td  dis'>{item.phone}</td>
                                 <td className='table-td  dis'>{item.pasport}</td>
                                 <td className='table-td'>
                                    {item?.regions?.map((item ,index) =>(
                                        <span className='span__region' key={index}>
                                          <span>{item.region}</span>
                                        </span>
                                    )) }
                                 </td>
                                 <td className="table-td"> 
                                  <img width={20} onClick={() => editEnginer(item)} className='icons' src={editicon} alt="" />
                                  <img onClick={()=>deleteEnginer(item.id)} className='icons' src={deleteicon} alt="" />
                                  </td>
                            </tr>
                        ))
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import logo from '../../assets/jpg/logo.png'
import './Login.css'
import http from '../../axois'
import { useNavigate } from 'react-router-dom'
import { Rigister } from '../../contex/Contex'
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {
    const{setToken} = useContext(Rigister)
    const [password ,setPassword ] = useState('') 
    const [number ,serNumber] = useState('')
    const [role ,setRole] = useState('')
    const navigate = useNavigate()
    const notify = (text) => toast(`${text}`);
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        http.post(`/${role}/login` , {
            id_number: password,
            phone: number
        }).then(res=> {
            console.log(res.data.data)
         
            if(res.data.status = "OK"){
               setToken(res.data.data)
                navigate('/')
            }
        }).catch((err)=>{
           notify('Kiritilgan malulotlarda hatolik bor !!!')
        })
    }
    return (
        <div className='login__wrapper'>
            <ToastContainer
            autoClose={1500}
            />
            <div>
                <div className='logotip__wrapper'>
                    <img className='logotiv' src={logo} alt="" />
                    <h3 className='logotip__title'>Davlat yo’l harakati xavfsizligi xizmati</h3>
                </div>
                <div className='login__input-wrapper'>
                    <h3 className='entery'>Kirish</h3>
                    <h5 className='label__input1'>Passport seriyasi</h5>
                    <input onChange={(e)=>setPassword(e.target.value)} className='input__login' type="text" />
                    <h5 className='label__input'>Telefon raqami</h5>
                    <input onChange={(e)=> serNumber(e.target.value)} className='input__login' type="text" />  
                    <h5 className='label__input'>Role tanlash</h5>                 
                        <select  onChange={(e) =>setRole(e.target.value)} className='login__select' >
                            <option selected hidden disabled value="">Select your role</option>
                            <option value="superadmin">Superadmin</option>
                            <option value="admin">Admin</option>
                        </select>
                    <button onClick={(e) => handleSubmit(e)} className='login__submit-btn'>Tizimga kirish</button>
                </div>
            </div>
            <div className='triangle'>
            </div>
        </div>
    )
}

import "./addadmin.css";
import editicon2 from '../../assets/svg/Vector (1).svg'
import plus from "../../assets/svg/+.svg";
import editicon from "../../assets/svg/editicon.svg";
import deleticon from "../../assets/svg/deleticon.svg";
import { useState } from "react";
import http from "../../axois";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import deleteicon from '../../assets/svg/Vector (2).svg'
import { ToastContainer, toast } from 'react-toastify';


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
const Addadminpage = () => {
  const [ty ,setTY] = useState('')
  const [adminId , setAdminId] = useState('')
  const [edit , setEdit] = useState(false)
  const [addTraf, setAddTraf] = useState(false);
  const [delTraf, setDelTraf] = useState(false);
  const [editTraf, setEditTraf] = useState(false);
  const [addEnge, setAddEnge] = useState(false);
  const [delEnge, setDelEnge] = useState(false);
  const [editEnge, setEditEnge] = useState(false);
  const [addRigion, setAddRigion] = useState(false);
  const [delRigion, setDelRigion] = useState(false);
  const [editRigion, setEditRigion] = useState(false);
  const [sendMass, setSendMass] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id_number, setId_number] = useState("");
  const [phone, setPhone] = useState("");
  const [personName, setPersonName] = useState([]);
  const [admins , setAdmins] = useState([])

  const notify = (text) => toast(`${text}`);
  // useEffect(() => {
  //     http.get("/")
  // } ,[])
  


  

  const handlesubmit = () => {
    http.post("/admin", {
      admin_roles: {
        create_engineer: addEnge,
        create_region: addRigion,
        create_traffic__light: addTraf,
        delete_engineer: delEnge,
        delete_region: delRigion,
        delete_traffic_light: delTraf,
        edit_engineer: editEnge,
        edit_region: editRigion,
        edit_traffic_light: editTraf,
        send_fix_message: sendMass,
      },
      first_name: name,
      id_number: id_number,
      last_name:lastName,
      phone: phone,
    }).then(res =>{
      if(res.status === 201){
        notify("Admin qo'shildi")
            setTimeout(() => {                    
                window.location.reload()
            }, 1500);
    
      }
    })
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
 useEffect(() =>{
   http.get('/admins').then(res =>{
    console.log(res.data.data.admins)
    setAdmins(res.data.data.admins)
   })
 } , [])
 const editAdmin =(item)=>{
  setAdminId(item.id)
  setEdit(true)
  setAddEnge(item.roles.create_engineer)
  setAddRigion(item.roles.create_region)
  setAddTraf(item.roles.create_traffic__light)
  setDelEnge(item.roles.delete_engineer)
  setDelRigion(item.roles.delete_region)
  setDelTraf(item.roles.delete_traffic_light)
  setEditEnge(item.roles.edit_engineer)
  setEditRigion(item.roles.edit_region)
  setEditTraf(item.roles.edit_traffic_light)
  setSendMass(item.roles.send_fix_message)
  setName(item.first_name)
  setLastName(item.last_name)
  setPhone(item.phone)
  setId_number(item.id_number)
}
console.log(addEnge )
 const deletAdmin =(item)=>{
  http.delete(`/admin/${item.id}`).then(res =>{
    if(res.status ===200){
      notify("Admin o'chirildi")
            setTimeout(() => {                    
                window.location.reload()
            }, 1500);
    }
  })
 }
 const handleEdit =()=>{
 http.put('/admin' ,{
  
    first_name: name,
    id: adminId,
    id_number: id_number,
    last_name: lastName,
    phone: phone,
    roles: {
      create_engineer: addEnge,
      create_region: addRigion,
      create_traffic__light: addTraf,
      delete_engineer: delEnge,
      delete_region: delRigion,
      delete_traffic_light: delTraf,
      edit_engineer: editEnge,
      edit_region: editRigion,
      edit_traffic_light: editTraf,
      send_fix_message: sendMass
    
  }
 }).then(res =>{
  console.log(res.data)
  if(res.status === 200){
    notify("Admin malumotlari o'zgartirildi")
            setTimeout(() => {                    
                window.location.reload()
     }, 1500);
  }
 })
 }
  return (
    <div>
      <ToastContainer
          autoClose={1500}
      />
      <div className="container">
        <div className="addadmin__wrapper">
          <h2>Admin panel</h2>
          <div className="addadmin__form">
            <label>
              <p>Ism</p>
              <input defaultValue={name} type="text" onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              <p>Familya</p>
              <input
                 defaultValue={lastName}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              <p>Telefon raqam</p>
              <input defaultValue={phone} type="text" onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
              <p>ID raqami</p>
              <input
                 defaultValue={id_number}
                type="text"
                onChange={(e) => setId_number(e.target.value)}
              />
            </label>
            <FormControl sx={{ m: 0, width: 300 }}>
              <InputLabel>kerakli xizmatni tanlash</InputLabel>
              <Select
                className="select__dropdown"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
               
              >
                <MenuItem
                  onClick={() => setSendMass(!sendMass)}
                  value="tuzatishga ruxsat"
                >
                  <Checkbox 
                    checked={sendMass}
                    onClick={() => setSendMass(!sendMass)}
                  />
                  <ListItemText primary="tuzatishga ruxsat" />
                </MenuItem>
                <MenuItem
                  onClick={() => setAddTraf(!addTraf)}
                  value="svetafor qo'shish"
                >
                  <Checkbox
          
                    checked={addTraf}
                    onClick={() => setAddTraf(!addTraf)}
                  />
                  <ListItemText primary="svetafor qo'shish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setDelTraf(!delTraf)}
                  value="svetafor o'chirish"
                >
                  <Checkbox
                    checked={delTraf}
                    onClick={() => setDelTraf(!delTraf)}
                  />
                  <ListItemText primary="svetafor o'chirish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setEditTraf(!editTraf)}
                  value="svetafor tahrirlash"
                >
                  <Checkbox 
                    checked={editTraf}
                    onClick={() => setEditTraf(!editTraf)}
                  />
                  <ListItemText primary="svetafor tahrirlash" />
                </MenuItem>
                <MenuItem
                  onClick={() => setAddEnge(!addEnge)}
                  value="usta yaratish"
                >
                  <Checkbox
                    checked={addEnge}
                    onClick={() => setAddEnge(!addEnge)}
                  />
                  <ListItemText primary="usta yaratish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setDelEnge(!delEnge)}
                  value="usta o'chirish"
                >
                  <Checkbox
                    checked={delEnge}
                    onClick={() => setDelEnge(!delEnge)}
                  />
                  <ListItemText primary="usta o'chirish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setEditEnge(!editEnge)}
                  value="usta thrirlash"
                >
                  <Checkbox
                    checked={editEnge}
                    onClick={() => setEditEnge(!editEnge)}
                  />
                  <ListItemText primary="usta thrirlash" />
                </MenuItem>
                <MenuItem
                  onClick={() => setAddRigion(!addRigion)}
                  value="tuman yaratish"
                >
                  <Checkbox
                    checked={addRigion}
                    onClick={() => setAddRigion(!addRigion)}
                  />
                  <ListItemText primary="tuman yaratish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setDelRigion(!delRigion)}
                  value="tuman o'chirish"
                >
                  <Checkbox
                    checked={delRigion}
                    onClick={() => setDelRigion(!delRigion)}
                  />
                  <ListItemText primary="tuman o'chirish" />
                </MenuItem>
                <MenuItem
                  onClick={() => setEditRigion(!editRigion)}
                  value="tuman tahrirlash"
                >
                  <Checkbox
                    checked={editRigion}
                    onClick={() => setEditRigion(!editRigion)}
                  />
                  <ListItemText primary="tuman tahrirlash" />
                </MenuItem>
              </Select>
            </FormControl>
           {
            edit ?
            <button onClick={handleEdit}>
             Tahrirlash
          </button>:
            <button onClick={handlesubmit}>
            Qo’shish
            <img src={plus} alt="plus" />
          </button>
           }
          </div>
          <table className="adminpanel__table">
            <thead>
              <tr>
                <th>No:</th>
                <th>Ism</th>
                <th>Familiya</th>
                <th>Telefon raqam</th>
                <th>ID Raqam</th>
                <th>Qo’shish +</th>
                <th>
                  Tahrirlash{" "}
                  <img className="action__icon" src={editicon} alt="editicon" />{" "}
                </th>
                <th>
                  O’chirish
                  <img
                    className="action__icon"
                    src={deleticon}
                    alt="editicon"
                  />{" "}
                </th>
                 <th>
                  Action
                 </th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map((item, index) =>(
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.id_number}</td>
                    <td className="td__qoshish">
                  <button className={item.roles.create_traffic__light ? 'button__true' :'button__false'} >Svetafor</button> <button className={item.roles.create_engineer ? 'button__true' :'button__false'} >Usta</button>
                </td>
                <td className="td__edit">
                  <button className={item.roles.edit_traffic_light ? 'button__true' :'button__false'}  >Svetafor</button> <button className={item.roles.edit_engineer ? 'button__true' :'button__false'}  >Usta</button>
                </td>
                <td className="td__delet">
                  <button className={item.roles.delete_traffic_light ? 'button__true' :'button__false'}  >Svetafor</button> <button className={item.roles.delete_engineer ? 'button__true' :'button__false'}  >Usta</button>
                </td>
                <td>
                <img onClick={() => editAdmin(item)} className='icons' src={editicon2} alt="" />
                <img onClick={()=>deletAdmin(item)} className='icons' src={deleteicon} alt="" />

                </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Addadminpage;

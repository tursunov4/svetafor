import editicon from '../../assets/svg/editicon.svg'
import deleticon from "../../assets/svg/deleticon.svg"
import './adminpage.css'
import { Link } from 'react-router-dom'
const adminPage =()=>{
    return(
        <div className="adminpage">
         <div className="container">
         <div className="admin__wrapper">
                <h2>Admin panel</h2>
                 <div className="admin-table__wrapper">
                    <h4>Adminlar ro’yxati</h4>
                    <Link className='btn' to={"/addadmin"}> Admin qo’shish +</Link>
                 </div>
                 <table className='adminpanel__table'>
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Ism</th>
                            <th>Familiya</th>  
                            <th>Telefon raqam</th>
                            <th>Qo’shish +</th>
                            <th>Tahrirlash <img  className='action__icon' src={editicon} alt="editicon" /> </th>
                            <th>O’chirish <img className='action__icon' src={deleticon} alt="editicon" /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>shaxzod</td>
                            <td>Ismoilo</td>
                            <td>+998 33 329 20 09</td>
                            <td className='td__qoshish'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__edit'><button>Svetafor</button> <button>Usta</button></td>
                            <td className='td__delet'><button>Svetafor</button> <button>Usta</button></td>
                        </tr>
                    </tbody>
                 </table>
            </div>
         </div>
        </div>
    )
}
export default adminPage
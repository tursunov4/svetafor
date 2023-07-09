import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import zayafkaIcon from "../../assets/svg/zayafka.svg";
import defictive from "../../assets/svg/defictive.svg";
import addtraffic from "../../assets/svg/Vector (3).svg";
import adduser from "../../assets/svg/Vector (4).svg";
import adminicon from "../../assets/svg/adminicon.svg";
import statis from "../../assets/svg/statis.svg";
import "./layout.css";
import { Rigister } from "../../contex/Contex";

const Layout = () => {
  const { token } = useContext(Rigister);
  return (
    <div className="layout-wrapper">
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? "item-link-active" : "item-link"
        }
      >
        <img src={zayafkaIcon} alt="re" /> Zayafka Svetoforlar
      </NavLink>
      <NavLink
        to="/defictive"
        className={({ isActive }) =>
          isActive ? "item-link-active" : "item-link"
        }
      >
        <img src={defictive} alt="defictive-icon" /> Nosoz svetaforlar
      </NavLink>
      <NavLink
        to="/statistika"
        className={({ isActive }) =>
          isActive ? "item-link-active" : "item-link"
        }
      >
        <img src={statis} alt="defictive-icon" /> Statistika
      </NavLink>
      {token.first_name !== "SuperAdmin" ? (
        token.roles.create_traffic__light=== false &&
        token.roles.delete_traffic_light === false &&
        token.roles.edit_traffic_light  === false ? (
       ""
        ) : (
          
          <NavLink
          to="/addtraffic"
          className={({ isActive }) =>
            isActive ? "item-link-active" : "item-link"
          }
        >
          <img src={addtraffic} alt="defictive-icon" /> Svetafor qo’shish
        </NavLink>
        )
      ) : (
        <NavLink
        to="/addtraffic"
        className={({ isActive }) =>
          isActive ? "item-link-active" : "item-link"
        }
      >
        <img src={addtraffic} alt="defictive-icon" /> Svetafor qo’shish
      </NavLink>
      )}
      {token.first_name !== "SuperAdmin" ? (
        token.roles.create_engineer === false &&
        token.roles.delete_engineer === false &&
        token.roles.edit_engineer === false ? (
       ""
        ) : (
          <NavLink
          to="/adduser"
          className={({ isActive }) =>
            isActive ? "item-link-active" : "item-link"
          }
        >
          <img src={adduser} alt="defictive-icon" /> Foydalanuvchi qo’shish
        </NavLink>
        )
      ) : (
        <NavLink
          to="/adduser"
          className={({ isActive }) =>
            isActive ? "item-link-active" : "item-link"
          }
        >
          <img src={adduser} alt="defictive-icon" /> Foydalanuvchi qo’shish
        </NavLink>
      )}
      {token.roles === "superadmin" ? (
        <NavLink
          to="/addadmin"
          className={({ isActive }) =>
            isActive ? "item-link-active" : "item-link"
          }
        >
          <img src={adminicon} alt="defictive-icon" /> Admin panel
        </NavLink>
      ) : (
        ""
      )}
      <NavLink
        to="/map"
        className={({ isActive }) =>
          isActive ? "item-link-active" : "item-link"
        }
      >
        <img src={adminicon} alt="defictive-icon" /> svetafor xaritasi
      </NavLink>
    </div>
  );
};

export default Layout;

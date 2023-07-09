import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Region from "./pages/region/Region";
import Defictive from "./pages/defictive/Defictive";
import Login from "./pages/LogIn/Login";
import DefictiveDownload from "./pages/defictive/DefictiveDownload";
import SingleRegionSvet from "./pages/SingleRegionSvet/SingleRegionSvet";
import Addtrafficlight from "./pages/addtrafficlight/Addtrafficlight";
import AddUser from "./pages/AddUser/AddUser";
import AdminPage from "./pages/adminPage/AdminPage";
import Addadminpage from "./pages/adminPage/Addadminpage";
import { useContext } from "react";
import { Rigister } from "./contex/Contex";
import YandexMap from "./pages/yandexmap/YandexMap";
import Statis from "./pages/Statis/Statis";
function App() {
  const { token } = useContext(Rigister);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <Main /> : <Login />}>
          <Route index element={<Region />} />
          <Route path="/defictive" element={<Defictive />} />
          <Route index element={<Region />} />
          <Route path="/defictive" element={<Defictive />} />
          <Route path="/defictive-download/:id" element={<DefictiveDownload />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/addadmin" element={<Addadminpage />} />
          <Route path="/singleregionsvet/:id" element={<SingleRegionSvet />} />
          <Route index element={<Region />} />
          <Route path="/defictive" element={<Defictive />} />
          <Route path="/defictive-download/:id" element={<DefictiveDownload />} />
          <Route path="/statistika" element={<Statis />} />
          <Route path="/addtraffic" element={<Addtrafficlight />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/defictive-download/:id" element={<DefictiveDownload />} />
          <Route path="/map" element={<YandexMap />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </div>
  );
}

export default App;

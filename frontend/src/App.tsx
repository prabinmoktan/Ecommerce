import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home/index";
import Products from "./pages/Products/Products";
import Sidebar from "./Layout/Sidebar/Sidebar";

function App() {
  return (
    <>
    <div className="flex"> 
      <Sidebar/>
      <Routes>
        {/* <Route path="/" element={<Sidebar />} > */}
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        {/* </Route> */}
      </Routes>
    </div>
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./utils/PrivateRoute";
// import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";


function App() {


  return (
    <>
       <Routes>
      { <Route path='/' element={<Login/>} /> } 
      { <Route path='/signup' element={<Signup/>} /> }    
   

      {/* <Layout children={ */}
          {/* { <Route path='/floor/:index'  element={<PrivateRoute component={<Floor/>} />} /> } */}
      {/* } /> */}
      </Routes>

      
      
    </>
  )
}

export default App











// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Reception from "./pages/Reception/Reception";
// import Floor from "./pages/Floor/Floor";
// import PrivateRoute from "./utils/PrivateRoute";
// import Layout from "./components/Layout/Layout";
// import Forbidden from "./pages/Forbidden/Forbidden";

// const router = createBrowserRouter([
//  //FILL HERE
// ]);

// function App() {
//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

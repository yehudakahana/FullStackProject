// import React, { ReactNode } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import useBuildingData from "../../utils/BuildingDataProvider";
// import "./Layout.css";
// const Layout: React.FC<{children:ReactNode}> = ({children}) => {
  
//   const floorAccess = useSelector(
//     (state: {
//       floorAccess: {
//         floorAccess: [boolean, boolean, boolean, boolean, boolean];
//       };
//     }) => state.floorAccess.floorAccess
//   );
//   console.log(floorAccess);

//     const { getFloorByIndex } = useBuildingData();
//   return (
//     <div className="layout-page">
//       <nav className="navbar">
//         <h1>מגדל נמרודי</h1>
//         <div className="nav-links">
//             <Link to="/">Home</Link>
//           {floorAccess.map((_: boolean, index: number) => (
//             <Link key={index} to={`/floor/${index}`}>
//               {getFloorByIndex(index)?.purpose || `Floor ${index + 1}`}
//             </Link>
//           ))}
//         </div>
//       </nav>
//       {children}
//       <footer className="layout-footer">
//         <h2>About מגדל נמרודי</h2>
//         <p>
//           Nimrodi Tower is a prominent skyscraper in the BBC complex of Bnei
//           Brak, comprising 55 floors reaching a height of 211 meters. It
//           includes commercial and office spaces with a unique architectural
//           style. The project, part of a larger construction initiative,
//           positions the Nimrodi Tower as a key architectural landmark in the
//           cityscape.
//         </p>
//       </footer>
//     </div>
//   );
// };
// export default Layout;






import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates, vote } from "../../store/candidatesSlice"; 
import { RootState } from "../../store/store"; 
import { logout } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Candidates.css";

const Candidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidates, status, error } = useSelector((state: RootState) => state.candidates);

  const [localCandidates, setLocalCandidates] = useState<any[]>([]);

  useEffect(() => {
     //@ts-ignore
    dispatch(getCandidates());
  }, [dispatch]);

  useEffect(() => {
    if (candidates) {
      setLocalCandidates(candidates);
    }
  }, [candidates]);


   

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  
  const handleVote = (candidateName: string) => {
    //@ts-ignore
    dispatch(vote(candidateName))
    //@ts-ignore
    dispatch(getCandidates());


    
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="candidates-container">
        {localCandidates.length > 0 ? (
          localCandidates.map((candidate) => (
            <div key={candidate.name} className="candidate-card">
              <img src={candidate.image} alt={candidate.name} />
              <h2>{candidate.name}</h2>

              <button onClick={() => handleVote(candidate.name)}>   
                  <p>Votes: {candidate.votes}</p>
              </button>
            </div>
          ))
        ) : (
          <p>No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default Candidates;




















// import  { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCandidates } from "../../store/candidatesSlice"; 
// import { RootState } from "../../store/store"; 
// import { logout } from "../../store/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import "./Candidates.css"

// const Candidates = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const { candidates, status, error } = useSelector((state: RootState) => state.candidates);


//   const [localCandidates, setLocalCandidates] = useState<any[]>([]);

//   useEffect(() => {
//     //@ts-ignore
//     dispatch(getCandidates()); 
//   }, [dispatch]);

//   useEffect(() => {
//     if (candidates) {
//       setLocalCandidates(candidates);
//     }
//   }, [candidates]); 

//    const handleLogout = ()=> {
//     dispatch(logout())
//     localStorage.removeItem("token")
//     navigate("/"); 


//    }
  

//   return (
//     <div>
//       <button onClick={handleLogout}>logout</button>
//       {status === "loading" && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {localCandidates.length > 0 ? (
//         localCandidates.map((candidate) => (
//           <div key={candidate.id}>
//             <h2>{candidate.name}</h2>
//             <img src={candidate.image} alt="" />
//             <p>num of votes: {candidate.votes}</p>
//           </div>
//         ))
//       ) : (
//         <p>No candidates available</p>
//       )}
//     </div>
//   );
// };

// export default Candidates;

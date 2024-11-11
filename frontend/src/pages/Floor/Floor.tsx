import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useIsVerified from '../../utils/VerifyActivity';
import useBuildingData from '../../utils/BuildingDataProvider';
import './Floor.css'; 

const Floor: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const floorIndex = parseInt(index || "0");
  const { getFloorByIndex, getListOfActivities } = useBuildingData();
  const navigate = useNavigate();

  const thisFloor = getFloorByIndex(floorIndex);
  const currentRole = useSelector((state: { role: string }) => state.role);
  const thisFloorActivity: string = thisFloor?.activity || "";
  const activities = getListOfActivities();

  const handleClick = () => {
    const isVerified = useIsVerified({ activity: thisFloorActivity, role: currentRole, activities });
    if (isVerified) {
      alert(`You are currently ${thisFloorActivity}`);
    } else {
      navigate("/forbidden");
    }
  };

  return (
    <div className="floor-container">
      <header className="floor-header">
        <h1 className="floor-title">{thisFloor?.name}</h1>
        <h2 className="floor-purpose">{thisFloor?.purpose}</h2>
      </header>

      <section className="floor-info">
        <div className="info-item">
          <h4>Amount of Soldiers</h4>
          <p>{thisFloor?.soldiers}</p>
        </div>
        <div className="info-item">
          <h4>Description</h4>
          <p>{thisFloor?.description}</p>
        </div>
      </section>

      <button className="access-button" onClick={handleClick}>
        {thisFloorActivity}
      </button>
    </div>
  );
};

export default Floor;

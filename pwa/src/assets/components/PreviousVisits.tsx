import './PreviousVisits.css';
import { useAppSelector } from "../../store";
import { useParams } from 'react-router-dom';

  const ItemDisplay = () => {
    
    //const item = useAppSelector((state) => 
    //  state.backend.items.find((item) => item.id === "fdfdsfdsfds")
    //);
    const { id } = useParams<{ id: string }>();
  
    const item = useAppSelector((state) => 
      state.backend.items.find((item) => item.id === id)
    );
  
    return (
        <>
        <h1>
            Previous visits
        </h1>
        {item &&(
            <div className = "visits-list">
                {item.visits.map((visit, index) => (
                <div className = "visit-card">
                    <div className = "visit-card__row">
                        <div>Date:</div>
                        <div>{visit.createdAt}</div>
                    </div>
                    <div className = "visit-card__row">
                        <div>Condition:</div>
                        <div>{visit.condition}</div>
                    </div>
                    <div className = "visit-card__row">
                        <div>Surveyor:</div>
                        <div>{visit.surveyor}</div>
                    </div>
                </div>
                ))}    
        </div>
        )}
        </>

    );
  }
  
  export default ItemDisplay;
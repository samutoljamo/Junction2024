import { useAppSelector } from "../../store";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import './NewVisit.css';
import Sheet from "@mui/joy/Sheet";
import { useFormFill } from "../../hooks";
import { addVisit } from "../../store/backendSlice";
import Textarea from "@mui/joy/Textarea";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from "@mui/joy/Input";
import { setFreeComment } from "../../store/formSlice";
import { TextField } from "@mui/joy";

const VisitDisplay = () => {
    
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const dispatch = useDispatch();
    const [condition, setCondition] = useState('new');

    const [freeComment, setFreeComment] = useState('');

    const [surveyor, setSurveyor] = useState('')

    const item = useAppSelector((state) => 
      state.backend.items.find((item) => item.id === id)
    );

    const handleSave = () => {
        dispatch(addVisit({
          itemId: id as string,
          visit: {
            condition: condition,
            notes: freeComment,
            createdAt: new Date().toLocaleDateString(),
            surveyor: surveyor,
          }
        }));
        navigate("../");
      };

    return (
        <>
        <h1>
            {item?.equipmentName}
        </h1>
        <div>
            <div className = "info-wrapper">
                <div className = "info-item">
                    <div>
                    Serial number:
                    </div>
                    <div>
                        {item?.serialNumber}
                    </div>
                </div>
                <div className = "info-item">
                    <div>
                    Manufacturer date:
                    </div>
                    <div>
                        {item?.manufacturingYear}
                    </div>
                </div>                
            </div>
            <h2 style={{
         marginBottom:"10px"
        }}>Modify</h2>
            <div className ="form-wrapper">
            <FormControl>
            <FormLabel>Surveyor</FormLabel>
            <Input value={surveyor}
          onChange={(e) => setSurveyor(e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>Condition</FormLabel>
                <select value={condition} 
          onChange={(e) => setCondition(e.target.value)}
        >
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                </select>
            </FormControl>
           
            <FormControl>
            <FormLabel>Free Comment</FormLabel>
            <Textarea value={freeComment}
          onChange={(e) => setFreeComment(e.target.value)}/>
            </FormControl>
            </div>
        </div> 
        <Button
        style={{
          backgroundColor: "#542DAE",
          fontWeight: "400",
          marginTop: "15px",
          boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.35)",
          borderRadius: "10px",
          marginRight: "10px"
        }}
        onClick={handleSave}
        color="primary"
      >
        Save
      </Button>
        <Button
        style={{
          backgroundColor: "#542DAE",
          fontWeight: "400",
          marginTop: "15px",
          boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.35)",
          borderRadius: "10px"
        }}
        onClick={() => {
          navigate("../");
        }}
        color="primary"
      >
        Go Back
      </Button>
        </>

    );
}
export default VisitDisplay;
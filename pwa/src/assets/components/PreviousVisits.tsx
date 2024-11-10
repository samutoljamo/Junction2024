import "./PreviousVisits.css";
import { useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";

import Stack from "@mui/joy/Stack";

const ItemDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const item = useAppSelector((state) =>
    state.backend.items.find((item) => item.id === id)
  );

  return (
    <>
      <h1>Previous visits</h1>
      {item && (
        <div className="visits-list">
          {item.visits.map((visit, index) => (
            <Stack
              p={2}
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{
                backgroundColor: "#E8E8F3",
                boxShadow: "1px 2px 5px 0 rgba(0,0,0,0.15)",
              }}
              key={index}
            >
              {item.pictures?.length && (
                <img
                  width={50}
                  height={50}
                  src={
                    item.pictures[
                      Math.floor(Math.random() * item.pictures.length)
                    ].data
                  }
                />
              )}
              <div className="visit-card">
                <div className="visit-card__row">
                  <div>Date:</div>
                  <div>{visit.createdAt}</div>
                </div>
                <div className="visit-card__row">
                  <div>Condition:</div>
                  <div>{visit.condition}</div>
                </div>
                <div className="visit-card__row">
                  <div>Surveyor:</div>
                  <div>{visit.surveyor}</div>
                </div>
              </div>
            </Stack>
          ))}
        </div>
      )}
      <Button
        style={{
          backgroundColor: "#542DAE",
          fontWeight: "400",
          marginTop: "15px",
          boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.35)",
          borderRadius: "10px",
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
};

export default ItemDisplay;

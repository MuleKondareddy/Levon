import React, { useContext } from "react";
import { TrafficLightContext } from "../TrafficLightContext";

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handlePedestrianRequest = () => {
    if (!state.pedestrianRequest && state.currentLight !== "red") {
      dispatch({ type: "REQUEST_CROSSING" });
    }
  };

  return (
    <button onClick={handlePedestrianRequest} className="pedestrian-button">
      {state.pedestrianRequest ? "Wait..." : "Request to Cross"}
    </button>
  );
};

export default PedestrianButton;

import React, { useContext } from "react";
import { TrafficLightContext } from "../TrafficLightContext";

const EmergencyButton = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handleEmergencyOverride = () => {
    if (!state.emergencyOverride) {
      dispatch({ type: "EMERGENCY_OVERRIDE", payload: true });
    } else {
      dispatch({ type: "EMERGENCY_OVERRIDE", payload: false });
    }
  };

  return (
    <button onClick={handleEmergencyOverride} className="emergency-button">
      {state.emergencyOverride ? "Stop Emergency" : "Emergency Override"}
    </button>
  );
};

export default EmergencyButton;

import React, { useContext } from "react";
import { TrafficLightContext } from "../TrafficLightContext";
import Light from "./Light";
import PedestrianButton from "./PedestrianButton";
import EmergencyButton from "./EmergencyButton";

const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);

  return (
    <div className="traffic-light-container">
      <div className="traffic-light">
        <Light color="red" isActive={state.currentLight === "red"} />
        <Light color="yellow" isActive={state.currentLight === "yellow"} />
        <Light color="green" isActive={state.currentLight === "green"} />
      </div>
      <PedestrianButton />
      <EmergencyButton />
      <div className="countdown-timer">Time: {state.countdown}s</div>
    </div>
  );
};

export default TrafficLight;

import React from "react";
import { TrafficLightProvider } from "./TrafficLightContext";
import TrafficLight from "./Components/TrafficLight";
import "./TrafficLight.css";

const App = () => {
  return (
    <TrafficLightProvider>
      <div className="app-container">
        <TrafficLight />
      </div>
    </TrafficLightProvider>
  );
};

export default App;

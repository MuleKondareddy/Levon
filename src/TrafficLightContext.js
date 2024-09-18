import React, { createContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  currentLight: "green", // Current traffic light
  pedestrianRequest: false, // Pedestrian crossing request
  emergencyOverride: false, // Emergency vehicle override
  countdown: 10, // Countdown timer for current light
};

// Actions
const CHANGE_LIGHT = "CHANGE_LIGHT";
const REQUEST_CROSSING = "REQUEST_CROSSING";
const RESET_TIMER = "RESET_TIMER";
const EMERGENCY_OVERRIDE = "EMERGENCY_OVERRIDE";

// Reducer function
const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LIGHT:
      return {
        ...state,
        currentLight: action.payload,
        countdown: action.timer,
      };
    case REQUEST_CROSSING:
      return { ...state, pedestrianRequest: true };
    case RESET_TIMER:
      return { ...state, countdown: action.timer };
    case EMERGENCY_OVERRIDE:
      return { ...state, emergencyOverride: action.payload };
    default:
      return state;
  }
};

// Create Context
export const TrafficLightContext = createContext();

// Context Provider
export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  // Timer logic for light transition
  useEffect(() => {
    let timer;
    if (!state.emergencyOverride) {
      timer = setInterval(() => {
        if (state.countdown === 0) {
          if (state.currentLight === "green") {
            dispatch({ type: CHANGE_LIGHT, payload: "yellow", timer: 3 });
          } else if (state.currentLight === "yellow") {
            dispatch({ type: CHANGE_LIGHT, payload: "red", timer: 7 });
          } else if (state.currentLight === "red") {
            // Handle pedestrian request during red light
            if (state.pedestrianRequest) {
              dispatch({ type: CHANGE_LIGHT, payload: "red", timer: 5 });
              dispatch({ type: REQUEST_CROSSING, payload: false }); // Reset pedestrian request
            } else {
              dispatch({ type: CHANGE_LIGHT, payload: "green", timer: 10 });
            }
          }
        } else {
          dispatch({ type: RESET_TIMER, timer: state.countdown - 1 });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

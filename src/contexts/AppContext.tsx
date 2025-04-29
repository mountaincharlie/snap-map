import React, { createContext, useReducer, useRef, ReactNode } from "react";
import type Map from "ol/Map";


// --- State interface
interface AppState {
  mapZoom: number;
  mapCenterCoords: [number, number];
}

// --- Actions
type Action =
  | { type: "SET_MAP_ZOOM"; payload: number }
  | { type: "SET_MAP_CENTER_COORDS"; payload: [number, number] };

// --- Initial state
const initialState: AppState = {
  mapZoom: 3,
  mapCenterCoords: [1951190.97, 3367513.89],
};

// --- Reducer function
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_MAP_ZOOM":
      return { ...state, mapZoom: action.payload };
    case "SET_MAP_CENTER_COORDS":
      return { ...state, mapCenterCoords: action.payload };
    default:
      return state;
  }
}

// --- Context value shape
interface AppContextType extends AppState {
  setMapZoom: (zoom: number) => void;
  setMapCenterCoords: (coords: [number, number]) => void;
  mapRef: React.MutableRefObject<Map | null>;
}

// --- Context
const AppContext = createContext<AppContextType>({} as AppContextType);

// --- Provider
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef<Map | null>(null);

  const setMapZoom = (zoom: number) => {
    dispatch({ type: "SET_MAP_ZOOM", payload: zoom });
  };

  const setMapCenterCoords = (coords: [number, number]) => {
    dispatch({ type: "SET_MAP_CENTER_COORDS", payload: coords });
  };

  const value: AppContextType = {
    ...state,
    mapRef,
    setMapZoom,
    setMapCenterCoords,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
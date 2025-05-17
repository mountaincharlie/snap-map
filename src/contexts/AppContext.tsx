import React, { createContext, useReducer, useRef, ReactNode } from "react";
import type { Photo, PhotoData } from "../utils/mapUtils";
import type Map from "ol/Map";


// --- State interface
interface AppState {
  mapZoom: number;
  mapCenterCoords: [number, number];
  selectedPhotoDetails: Photo | undefined;
  photoMetadata: PhotoData | undefined;
  photoModalOpen: boolean;
}

// --- Actions
type Action =
  | { type: "SET_MAP_ZOOM"; payload: number }
  | { type: "SET_MAP_CENTER_COORDS"; payload: [number, number] }
  | { type: "SET_SELECTED_PHOTO_DETAILS"; payload: Photo | undefined }
  | { type: "SET_PHOTO_METADATA"; payload: PhotoData | undefined }
  | { type: "SET_PHOTO_MODAL_OPEN"; payload: boolean }
;

// --- Initial state
const initialState: AppState = {
  mapZoom: 3,
  mapCenterCoords: [1951190.97, 3367513.89],
  selectedPhotoDetails: undefined,
  photoMetadata: undefined,
  photoModalOpen: false,
};

// --- Reducer function
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_MAP_ZOOM":
      return { ...state, mapZoom: action.payload };
    case "SET_MAP_CENTER_COORDS":
      return { ...state, mapCenterCoords: action.payload };
    case "SET_SELECTED_PHOTO_DETAILS":
      return { ...state, selectedPhotoDetails: action.payload };
    case "SET_PHOTO_METADATA":
      return { ...state, photoMetadata: action.payload };
    case "SET_PHOTO_MODAL_OPEN":
      return { ...state, photoModalOpen: action.payload };
    default:
      return state;
  }
}

// --- Context value shape (refs and functions to modify state)
interface AppContextType extends AppState {
  // Map
  mapRef: React.MutableRefObject<Map | null>;
  setMapZoom: (zoom: number) => void;
  setMapCenterCoords: (coords: [number, number]) => void;
  // Photos
  setSelectedPhotoDetails: (photo: Photo | undefined) => void;
  setPhotoMetadata: (photoMetadata: PhotoData | undefined) => void;
  // Modals
  setPhotoModalOpen: (isOpen: boolean) => void;
}

// --- Context
const AppContext = createContext<AppContextType>({} as AppContextType);

// --- Provider
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // -- Map
  const mapRef = useRef<Map | null>(null);

  const setMapZoom = (zoom: number) => {
    dispatch({ type: "SET_MAP_ZOOM", payload: zoom });
  };

  const setMapCenterCoords = (coords: [number, number]) => {
    dispatch({ type: "SET_MAP_CENTER_COORDS", payload: coords });
  };

  // -- Photos
  const setSelectedPhotoDetails = (photo: Photo | undefined) => {
    dispatch({ type: "SET_SELECTED_PHOTO_DETAILS", payload: photo });
  };

  const setPhotoMetadata = (photoMetadata: PhotoData | undefined) => {
    dispatch({ type: "SET_PHOTO_METADATA", payload: photoMetadata });
  };

  // -- Modals
  const setPhotoModalOpen = (isOpen: boolean ) => {
    dispatch({ type: "SET_PHOTO_MODAL_OPEN", payload: isOpen });
  };


  const value: AppContextType = {
    ...state,
    mapRef,
    setMapZoom,
    setMapCenterCoords,
    setSelectedPhotoDetails,
    setPhotoMetadata,
    setPhotoModalOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
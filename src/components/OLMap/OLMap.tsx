import { useEffect, useRef, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// import GeoJSON from "ol/format/GeoJSON";
// import {get as getProjection, fromLonLat } from "ol/proj";
// import { Style, Stroke, Fill } from "ol/style";
import "ol/ol.css";
import './OLMap.scss';


const OLMap = () => {
  const mapContainerRef = useRef(null);

  // state management from the app context
  const {  
    mapRef,
    mapZoom,
    mapCenterCoords,
  } = useContext(AppContext);

  // handle the setup of the map (only changes on specific map related changes)
  useEffect(() => {
    // Check if map already exists (prevents remounting) 
    if (!mapContainerRef?.current || mapRef.current) return;

    // setting up the map with OSM base tile layer
    const map = new Map({
      target: mapContainerRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: mapCenterCoords,
        zoom: mapZoom,
      }),
    });

    // storing instance of the map
    mapRef.current = map;

    return () => {
      map.setTarget(null); // Cleanup on unmount
      mapRef.current = null;
    };
  }, [mapCenterCoords, mapZoom, mapRef]);

  return <div ref={mapContainerRef} className="ol-map"/>;
};

export default OLMap;

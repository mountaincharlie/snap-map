import React, { useEffect, useRef, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle, Fill, Stroke } from "ol/style";
import "ol/ol.css";
import './OLMap.scss';


// prop types for OL map component
type OLMapProps = {
  photoFeatures: Feature<Point>[];
};


const OLMap: React.FC<OLMapProps> = ({ photoFeatures }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  console.log(typeof photoFeatures)

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

    var vectorLayers = [];

    // style each of the photoFeatures and add them to the map
    for (var feature of photoFeatures){
      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: '#0D2A35' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
        })
      );

      // create vector source
      var vectorSource = new VectorSource({
        features: [feature],
      });

      // create vector layer
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // add to the list
      vectorLayers.push(vectorLayer);
    };

    // setting up the map with OSM base tile layer
    const map = new Map({
      target: mapContainerRef.current,
      layers: [new TileLayer({ source: new OSM() }), ...vectorLayers],
      view: new View({
        center: mapCenterCoords,
        zoom: mapZoom,
      }),
    });

    // storing instance of the map
    mapRef.current = map;

    return () => {
      map.setTarget(undefined); // Cleanup on unmount
      mapRef.current = null;
    };
  }, [mapCenterCoords, mapZoom, mapRef]);

  return <div ref={mapContainerRef} className="ol-map"/>;
};

export default OLMap;

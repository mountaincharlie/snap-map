import React from 'react';
import OLMap from '../../components/OLMap/OLMap';
import { FaUnsplash, FaGithub, FaReact } from "react-icons/fa";
import { SiOpenlayers, SiTypescript } from "react-icons/si";
import photo_metadata_raw from "../../utils/photo_metadata.json";
import { createOpenLayerFeatures } from "../../utils/mapUtils";
import type { PhotoData } from "../../utils/mapUtils";
import './MapView.scss';


const MapView: React.FC = () => {

  // footer copyright year
  let copyrightYear = new Date().getFullYear();

  // get the raw metadata with the PhotoData type
  const photo_metadata = photo_metadata_raw as PhotoData;

  // for each item in photo_metadata create a feature with geometry, id and title
  const photoFeatures = createOpenLayerFeatures(photo_metadata);
  
  return (
    <div className="mapview">
      <div className="mapview-header">
        SNAP MAP
      </div>
      <div className="mapview-content">
        <div id="map-container" className="map-view-content-map-container">
          <OLMap photoFeatures={photoFeatures} />
        </div>
      </div>
      <div className="mapview-footer">
        <div className="mapview-footer-item">
          © charlieharland {copyrightYear}
        </div>
        <div className="mapview-footer-item">
          <SiTypescript/>
          <FaReact/>
          <SiOpenlayers/>
          <FaUnsplash/>
          <FaGithub/>
        </div>
      </div>
    </div>
  );
};

export default MapView;
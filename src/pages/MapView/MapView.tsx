import React from 'react';
import OLMap from '../../components/OLMap/OLMap';
import { FaUnsplash, FaGithub, FaReact } from "react-icons/fa";
import { SiOpenlayers, SiTypescript } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import './MapView.scss'


const MapView: React.FC = () => {

  // footer copyright year
  let copyrightYear = new Date().getFullYear();
  
  return (
    <div className="mapview">
      <div className="mapview-header">
        {/* Snap Map */}
        SNAP MAP
      </div>
      <div className="mapview-content">
        <div id="map-container" className="map-view-content-map-container">
          <OLMap />
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
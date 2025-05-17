import React, { useContext, useEffect, useMemo } from 'react';
import { AppContext } from "../../contexts/AppContext";
import OLMap from '../../components/OLMap/OLMap';
import Modal from '../../components/Modal/Modal';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import { FaUnsplash, FaGithub, FaReact } from "react-icons/fa";
import { SiOpenlayers, SiTypescript } from "react-icons/si";
import photo_metadata_raw from "../../utils/photo_metadata.json";
import { createOpenLayerFeatures } from "../../utils/mapUtils";
import type { PhotoData } from "../../utils/mapUtils";
import './MapView.scss';


const MapView: React.FC = () => {

  // state management from the app context
    const {  
      selectedPhotoDetails,
      photoMetadata,
      setPhotoMetadata,
      photoModalOpen,
      setPhotoModalOpen,
    } = useContext(AppContext);

  // footer copyright year
  let copyrightYear = new Date().getFullYear();

  // set photoMetadata in context as PhotoData type
  useEffect(() => {
    setPhotoMetadata(photo_metadata_raw as PhotoData);
  }, []);

  // create features only if there is photoMetadata
  const photoFeatures = useMemo(() => {
    if(!photoMetadata) return undefined;
    return createOpenLayerFeatures(photoMetadata);
  }, [photoMetadata])

  const handleClosePhotoModal = () => {
    // close modal
    setPhotoModalOpen(false);

    // unset selcted photo  - TODO: find a way to unselect the feature is better
    // setSelectedPhotoDetails(undefined);
  };
  
  return (
    <div className="mapview">
      <div className="mapview-header">
        SNAP MAP
      </div>

      <div className="mapview-content">

        {/* photo modal */}
        <Modal 
          isOpen={photoModalOpen}
          onClose={handleClosePhotoModal}
          title={selectedPhotoDetails?.photo_name}
          content={<PhotoDetails />}
        />

        {/* map */}
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
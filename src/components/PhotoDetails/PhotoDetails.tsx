import React, { useContext } from 'react';
import { AppContext } from "../../contexts/AppContext";
import { FaGlobeAfrica, FaMapPin, FaCamera, FaFilm } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import './PhotoDetails.scss';


const PhotoDetails: React.FC = () => {

  // state management from the app context
  const {  
    selectedPhotoDetails
  } = useContext(AppContext);


  return (
    <div className="photo-details">

      {/* photo */}
      <div className="photo-details-photo-container">
        <img src={selectedPhotoDetails?.photo_url} alt="Selected Photo"></img>
      </div>

      {/* info tags container */}
      <div className="photo-details-info-container">
        {/* location */}
        <div className="info-item"> <FaGlobeAfrica /> {selectedPhotoDetails?.photo_location_country_string}</div>
        <div className="info-item"> <FaMapPin /> {selectedPhotoDetails?.photo_closest_location_string}</div>
        {/* camera details */}
        <div className="info-item camera-details"> <FaCamera /> {selectedPhotoDetails?.photo_taken_on}</div>
        <div className="info-item camera-details"> 
          <FaFilm /> {selectedPhotoDetails?.photo_format} 
          {selectedPhotoDetails?.photo_format.toLocaleLowerCase() === 'film' && ` - ${selectedPhotoDetails?.photo_film_type}`}
        </div>
        {/* date */}
        <div className="info-item"> <IoCalendar /> {selectedPhotoDetails?.photo_month_year}</div>
      </div>

      {/* description */}
      <div className="photo-details-description"></div>

    </div>

  );
};

export default PhotoDetails;
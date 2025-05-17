
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';


// photo type
export type Photo = {
  photo_id: number;
  photo_url: string;
  photo_name: string;
  photo_location_country_string: string;
  photo_closest_location_string: string;
  photo_location_coords_3857: { "long": number, "lat": number };
  photo_description: string;
  photo_month_year: string;
  photo_taken_on: string;
  photo_format: string;
  photo_film_type: string;
};

// photo data type
export type PhotoData = {
  [key: string]: Photo;
};


// creating openlayers features from the Photo data (only needs the coords, id and the name for hover effect)
export const createOpenLayerFeatures = (photoData: PhotoData | undefined) => {
  if (photoData === undefined) return [];

  // list of ol feature point objects
  let featureData: Feature<Point>[] = [];

  // create a ol feature point for each photo
  for(const photo of Object.values(photoData)){

    var photoLongLat = [photo.photo_location_coords_3857.long, photo.photo_location_coords_3857.lat]

    const photoFeature = new Feature({
      geometry: new Point(photoLongLat),
      name: photo.photo_name,
      id: photo.photo_id
    });

    featureData.push(photoFeature);
  };

  return featureData;
}; 

// get photo data object by id
export const getPhotoDataById = (photoId: number, photoData: PhotoData | undefined) => {
  if (photoData === undefined) return undefined;

  return Object.values(photoData).find(photo => photo.photo_id === photoId);
};
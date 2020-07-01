import React, { FC } from 'react';
import { Photo, PhotoLocation } from './types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

interface PhotoMapProps {
  photos: Photo[];
  selectPhoto: (photo: Photo) => void;
}

interface MapPoint {
  lat: number;
  lng: number;
}

export const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: shadowIcon,
});

const PhotoMap: FC<PhotoMapProps> = (props) => {
  const getPostion = (p: PhotoLocation) => {
    return { lat: p.latitude, lng: p.longitude };
  };

  const photosByLocation = props.photos
    .filter((p) => {
      return p.location !== null;
    })
    .map((p) => {
      return { location: getPostion(p.location as PhotoLocation), photo: p };
    });

  const calculateCentriod = (points: MapPoint[]) => {
    const sum = points.reduce((previous, current) => {
      return {
        lat: previous.lat + current.lng,
        lng: previous.lat + current.lng,
      };
    });
    return { lat: sum.lat / points.length, lng: sum.lng / points.length };
  };

  const getCentroid = () => {
    if (photosByLocation.length !== 0)
      return calculateCentriod(
        photosByLocation.map((pl) => {
          return pl.location;
        }),
      );
    else return undefined;
  };

  const centroid = getCentroid();

  return (
    <>
      {centroid && (
        <Map center={centroid} zoom={3}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {photosByLocation.map(({ location, photo }) => {
            return (
              <Marker key={photo.id} position={location} icon={icon}>
                <Popup>
                  <img src={`data:image/png;base64, ${photo.thumbnail}`} alt="thumbnail" />
                  <br />
                  <button className="btn btn-primary btn-sm btn-block" onClick={() => props.selectPhoto(photo)}>
                    select
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      )}
    </>
  );
};

export default PhotoMap;

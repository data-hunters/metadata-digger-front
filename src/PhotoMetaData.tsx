import React, { FC } from 'react';
import { Photo, PhotoLocation } from './types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import shadowIcon from 'leaflet/dist/images/marker-shadow.png'
interface PhotoMetaDataProps {
  photo: Photo;
}
export const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: shadowIcon,
})

const PhotoMetaData: FC<PhotoMetaDataProps> = (props) => {
  const { meta_data } = props.photo;
  const fileName = props.photo.file_path.match(/[^/]*$/g);
  let getPostion = (p: PhotoLocation) => {
    return {lat: p.latitude, lng: p.longitude }
  }

  return (
    <>
    <div className="row">
      <div className="col">
        {props.photo.location && ( 
        <Map center={getPostion(props.photo.location)} zoom={13} >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={getPostion(props.photo.location)} icon={icon}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>)}
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <img src={`data:image/png;base64, ${props.photo.thumbnail}`} alt='thumbnail' />
        <h3>{fileName}</h3>

      </div>
      <div className="col-sm-6">

        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(meta_data).map(key => {
                const value = meta_data[key];
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value.toString().substring(0, 400)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default PhotoMetaData;
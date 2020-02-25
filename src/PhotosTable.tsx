import React, { FC } from 'react';
import { Photo } from './types';

interface PhotosTableProps {
  photos: Photo[];
  onPreviewClick: (photo: Photo) => void;
}

interface PhotoItemProps {
  onPreviewClick: (photo: Photo) => void;
  photo: Photo;
}

const PhotoItem: FC<PhotoItemProps> = (props) => {
  const { photo } = props;
  return (
    <tr>
      <td>
        <img src={`data:image/png;base64, ${photo.thumbnail}`} alt='thumbnail'/>
        </td>
      <td>{photo.file_path}</td>
      <td>{photo.file_type}</td>
      <td><button onClick={() => props.onPreviewClick(photo)}>show meta data</button></td>
    </tr>
  )
}

const PhotosTable: FC<PhotosTableProps> = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Thumbnail</th>
          <th>File path</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.photos.map((photo) => {
          return <PhotoItem onPreviewClick={props.onPreviewClick} photo={photo} />
        })}
        {props.photos.length === 0 ? <tr><td colSpan={4}>Start by typing query</td></tr> : null}
      </tbody>
    </table>
  )
}

export default PhotosTable;
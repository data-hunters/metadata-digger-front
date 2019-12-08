import React, { FC } from 'react';
import { Photo } from './types';

interface PhotoMetaDataProps {
  photo: Photo | null;
}

const PhotoMetaData: FC<PhotoMetaDataProps> = (props) => {
  if (!props.photo) {
    return <div>Select photo to preview</div>
  }
  const { meta_data } = props.photo;
  return (
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
              <tr>
                <td>{key}</td>
                <td>{value.toString().substring(0, 400)}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default PhotoMetaData;
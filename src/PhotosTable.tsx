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
            <td>{photo.id}</td>
            <td>{photo.file_path}</td>
            <td>{photo.file_type}</td>
            <td><button onClick={() => props.onPreviewClick(photo)}>show meta data</button></td>
        </tr>
    )
}

const PhotosTable: FC<PhotosTableProps> = (props) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>File path</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.photos.map((photo) => {
                        return <PhotoItem onPreviewClick={props.onPreviewClick} photo={photo} />
                    })}
                    {props.photos.length === 0 ? <tr><td colSpan={4}>Type search query to load photos</td></tr> : null}
                </tbody>
            </table>
        </div>
    )
}

export default PhotosTable;
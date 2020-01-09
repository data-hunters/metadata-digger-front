import React, { useCallback, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const FileUplaoderContainer = styled.div`
  margin-top: 20px;
`;

const FileUploadZone = styled.div`
  width: 100%;
  height: 100px;
  border: 2px solid #ddd;
  border-radius: 4px;
  border-style: dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('http://localhost:8080/api/v1/start-indexing', formData).then((response) => {
    console.log(response);
    localStorage.setItem("fileUploaded", "true");
  });
}

interface FileUplaoderProps {
  onUploadCompleted: () => void;
}

const FileUplaoder: FC<FileUplaoderProps> = ({ onUploadCompleted
}) => {
  const onDrop = useCallback(acceptedFiles => {
    uploadFile(acceptedFiles[0]).then(() => {
      onUploadCompleted();
    });
  }, [onUploadCompleted])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <FileUplaoderContainer>
      <h3>Start by uploading your image set:</h3>
      <FileUploadZone {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </FileUploadZone>
    </FileUplaoderContainer>
  )
}

export default FileUplaoder;
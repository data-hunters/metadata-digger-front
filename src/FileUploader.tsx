import React, { useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'

const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  axios.post('http://localhost:8080/api/v1/start-indexing', formData).then((response) => {
    console.log(response);
  });
}

const FileUplaoder = () => {
  const onDrop = useCallback(acceptedFiles => {
    uploadFile(acceptedFiles[0]);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUplaoder;
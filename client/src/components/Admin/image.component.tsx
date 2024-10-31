import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/system';
import { Delete } from '@mui/icons-material';
import { IconButton, Typography, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { images } from '../../interface/image.interface';
import { addimage,getimage , deleteimage,getByIdimage } from '../../api/image.api';
import axios from 'axios';

const GalleryImage = styled('img')({
  width: '100%',
  padding: '4px',
});

const GalleryComponent: React.FC = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getimage();
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (index: number) => {
    try {
      await deleteimage(index);
      const updatedEvents = images.filter((event: images) => event._id !== index);
      setImages(updatedEvents);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const dropzoneStyle: React.CSSProperties = {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // await addimage(formData);
      await axios.post('http://localhost:3000/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / Number(progressEvent.total)) * 100);
          setUploadProgress(progress);
          if (progress === 100) {
            setUploadButtonDisabled(false);
          }
        }
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }, []);

  const handleCancel = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadButtonDisabled(true);
  };

  const handleUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadButtonDisabled(true);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image: any, index) => (
          <div key={index} style={{ width: '250px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: '50px', display: 'flex', justifyContent: 'flex-end', right: 0, alignItems: 'center' }}>
              <Typography variant="h6" style={{ flex: 1 }}>{image.filename}</Typography>
              <IconButton onClick={() => handleDelete(image._id)}>
                <Delete />
              </IconButton>
            </div>
            <GalleryImage src={`http://localhost:3000/image/${image._id}`} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
        <Typography variant="h4">Upload New Image</Typography>
        {uploadedFile && (
          <div>
            <p>File: {uploadedFile.name}</p>
            <div style={{ width: '100%', border: '1px solid #000', borderRadius: '5px' }}>
              <div style={{ width: `${uploadProgress}%`, background: '#007bff', height: '20px', borderRadius: '5px' }}></div>
            </div>
            <p>{uploadProgress}% uploaded</p>
            <Button variant="contained" onClick={handleCancel} style={{ marginLeft: '5px' }} disabled={!uploadedFile}><FaTimes /> Cancel</Button>
            <Button variant="contained" onClick={handleUpload} style={{ marginLeft: '15px' }} disabled={uploadButtonDisabled}><FaUpload /> Upload File</Button>
          </div>
        )}
        {!uploadedFile && (
          <div {...getRootProps({ style: dropzoneStyle })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a image</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;
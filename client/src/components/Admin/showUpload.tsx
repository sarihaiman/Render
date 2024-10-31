import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

const downloadFile = async (fileUrl: string) => {
  try {
    const response = await axios.get(fileUrl, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/') + 1));
    document.body.appendChild(link);
    link.click();

    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  } catch (error) {
    console.error('Error downloading file', error);
  }
};

export default function DocumentUploadComponent() {
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upload');
        setFilenames(response.data.files);
      } catch (error) {
        console.error('Error fetching files', error);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div>
      <Typography style={{ textAlign: 'center' }} variant="h4">File Names:</Typography>
      <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filenames.map((fileName, index) => (
          <div key={index} style={{ width: '300px', height: '70px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ListItem key={index} button onClick={() => downloadFile(`http://localhost:3000/uploadOne/${fileName}`)}>
              <ListItemIcon>
                <GetAppIcon />
              </ListItemIcon>
              <ListItemText primary={fileName} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}


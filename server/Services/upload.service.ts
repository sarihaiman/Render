import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
}

export const uploadFile = async (req: Request, res: Response) => {
    const tempFile = req.file as MulterFile | undefined;

    if (!tempFile) {
        res.status(400).send('File data is missing');
        return;
    }

    const tempPath = tempFile.path;
    const originalName = tempFile.originalname;

    const targetPath = path.join(__dirname, `../uploads/${originalName}`);

    fs.rename(tempPath, targetPath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
            res.status(500).send('Error uploading file');
        } else {
            res.status(200).send('File uploaded successfully');
        }
    });
};

export const getUploadFile = async (req: Request, res: Response) => {
    const uploadDir = path.join(__dirname, '../uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.status(500).send('Error reading upload directory');
        } else {
            res.status(200).json({ files });
        }
    });

}

export const getUploadFileOne = async (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, `../uploads/${fileName}`);

    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
};


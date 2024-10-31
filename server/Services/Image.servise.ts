import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Image from '../Models/Image.Model';

export const postimages = async (req: any, res: Response) => {
    try {
        const newImage = new Image({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            image: req.file.buffer,
        });
        await newImage.save();
        res.status(201).send('Image uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading image');
    }
};

export const getimages = async (req: any, res: Response) => {
    try {
        const images = await Image.find().exec();
        if (!images || images.length === 0) {
            return res.status(404).send('No images found');
        }
        res.json(images);
    } catch (error) {
        res.status(500).send('Error fetching images');
    }
};

export const getByIdimages = async (req: any, res: Response) => {
    try {
        console.log(req.params.id);
        
        const image = await Image.findById(req.params.id);
       
        if (!image) {
            return res.status(404).send('Image not found');
        }

        res.set('Content-Type', image.contentType!);
        res.send(image.image);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
};

export const deleteimages = async (req: any, res: Response) => {
    try {
        await Image.deleteOne({ _id: req.params.id })  
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
};


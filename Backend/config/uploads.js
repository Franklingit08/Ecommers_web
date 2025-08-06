import pkg from 'cloudinary';

const { v2: cloudinary } = pkg;

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({
    cloud_name: 'dhtbeg2sr',
    api_key: '934626584227599',
    api_secret: 'xYcv_rL-2qWYpunAYHiH1ZO4S1Y',
});


const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Ecommers_web',
        format: () => 'png',
        public_id: Date.now,
    },
});

const productParser = multer({storage: productStorage})


export {productParser};
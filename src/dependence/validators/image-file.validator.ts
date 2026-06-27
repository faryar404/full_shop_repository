import {BadRequestException} from '@nestjs/common';
import multer from 'multer';

export class ImageFileValidator {
  static validate(files: Express.Multer.File[]) {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];

    const maxSize = 5 * 1024 * 1024;

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.mimetype)) throw new BadRequestException(`${file.originalname} format is invalid.`);
      
      if (file.size > maxSize) {
        throw new BadRequestException(
          `${file.originalname} is too large.`,
        );
      }
    }
  }
}
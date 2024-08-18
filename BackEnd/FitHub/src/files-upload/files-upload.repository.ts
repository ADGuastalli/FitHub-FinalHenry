import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ArchivosNoSubidosException } from 'src/Exceptions/Files.exceptions';

@Injectable()
export class FilesUploadRepository {
  async uploadFiles(
    files: Express.Multer.File[],
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          { resource_type: resourceType },
          (error, result) => {
            if (error) {
              reject(new ArchivosNoSubidosException());
            } else {
              resolve(result);
            }
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    });

    return Promise.all(uploadPromises);
  }

  async uploadPdfFiles(
    files: Express.Multer.File[],
  ): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          { resource_type: 'raw' },
          (error, result) => {
            if (error) {
              reject(new ArchivosNoSubidosException());
            } else {
              resolve(result);
            }
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    });

    return Promise.all(uploadPromises);
  }
}

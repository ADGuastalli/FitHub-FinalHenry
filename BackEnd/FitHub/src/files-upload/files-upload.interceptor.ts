// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   UseInterceptors,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { FilesInterceptor } from '@nestjs/platform-express';

// @Injectable()
// @UseInterceptors(FilesInterceptor('files', { limits: { fileSize: 1500000 } }))
// export class FilesUploadInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle();
//   }

//   public static validateFiles() {
//     return {
//       transform(files: Express.Multer.File[]) {
//         if (!files || files.length === 0) {
//           throw new Error('File is required');
//         }
//         return files;
//       },
//     };
//   }
// }

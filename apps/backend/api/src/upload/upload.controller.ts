import { BadRequestException, Controller, Delete, HttpException, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

  constructor(private readonly uploadeService: UploadService) { }
  @UseGuards(JwtAuthGuard)
  @Post(':folder/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const folder = req.params.folder
          const uploadPath = path.join('./uploads', folder, 'tmp')

          // Vérifie que le répertoire existe
          if (!fs.existsSync(uploadPath)) {
            return callback(
              new BadRequestException(`Le répertoire '${uploadPath}' n'existe pas.`),
              uploadPath,
            )
          }
          callback(null, uploadPath)
        },// Stockage temporaire du fichier original
        filename: (req, file, callback) => {
          const ext = path.extname(file.originalname);
          const baseName = uuidv4();
          callback(null, `${baseName}${ext}`);
        },
      }),
      limits: {
        fileSize: 8 * 1024 * 1024,
      },
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('folder') folder: string) {
    return await this.uploadeService.uploadFile(file, folder);
  }



  @UseGuards(JwtAuthGuard)
  @Delete(':folder/:id')
  remove(@Param('id') filename: string, @Param('folder') folder: string): Promise<void[]> {
    if (!filename) {
      throw new HttpException('Nom de fichier requis', HttpStatus.BAD_REQUEST);
    }

    return this.uploadeService.deleteFile([`${folder}/${filename}.webp`, `${folder}/${filename}_600.webp`]);
  }



}

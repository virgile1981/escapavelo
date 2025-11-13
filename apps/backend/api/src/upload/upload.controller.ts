import { BadRequestException, Controller, Delete, HttpException, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  
  @UseGuards(JwtAuthGuard)
  @Post(':folder/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:  (req, file, callback) => {
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
        fileSize: 10 * 1024 * 1024,
      },
    })
  )
  
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('folder') folder: string) {
    const sharp = require('sharp');

    if (!file) {
      throw new Error('Aucun fichier téléchargé');
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads',folder);
    const tmpPath = path.join(uploadsDir, 'tmp', file.filename);

    const baseName = path.parse(file.filename).name;
    const outputOriginal = path.join(uploadsDir, `${baseName}.webp`);
    const outputResized = path.join(uploadsDir, `${baseName}_600.webp`);

    try {
      // Convertir version originale en WebP (sans redimensionnement)
      await sharp(tmpPath)
        .webp({ quality: 90 })
        .toFile(outputOriginal);

      // Redimensionner et convertir version 600px
      await sharp(tmpPath)
        .resize(600)
        .webp({ quality: 80 })
        .toFile(outputResized);

      // Supprimer le fichier temporaire
      fs.unlinkSync(tmpPath);

    } catch (err) {
      console.error('Erreur Sharp :', err);
      throw new Error('Erreur lors de la conversion de l’image');
    }

    return {
      url: `${baseName}.webp`,
      resizedUrl: `${baseName}_600.webp`,
    };
  }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') filename: string): Promise<void[]> {
    if (!filename) {
      throw new HttpException('Nom de fichier requis', HttpStatus.BAD_REQUEST);
    }
   
    return this.deleteFile([filename+".webp", filename+"_600.webp"]);
  }


  private async deleteFile(filePaths: string[]): Promise<void[]> {
    return await Promise.all(filePaths.map(filePath =>
    fs.promises.unlink(path.join(path.join(__dirname, '..', 'uploads', filePath))
  )))
  }
}

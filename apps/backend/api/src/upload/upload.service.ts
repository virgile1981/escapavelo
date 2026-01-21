import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class UploadService {

    public async uploadFile(file: Express.Multer.File, folder: string) {
        const sharp = require('sharp');

        if (!file) {
            throw new Error('Aucun fichier téléchargé');
        }

        const uploadsDir = path.join(__dirname, '..', 'uploads', folder);
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
            // fs.unlinkSync(tmpPath);
        } catch (err) {
            console.error('Erreur Sharp :', err);
            throw new Error('Erreur lors de la conversion de l’image');
        }

        return {
            url: `${baseName}.webp`,
            resizedUrl: `${baseName}_600.webp`,
        };
    }

    public async deleteFile(filePaths: string[]): Promise<void[]> {
        return await Promise.all(filePaths.map(filePath =>
            fs.promises.unlink(path.join(path.join(__dirname, '..', 'uploads', filePath))
            )))
    }
}
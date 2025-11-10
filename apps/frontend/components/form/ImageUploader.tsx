'use client'

import { useState, useRef } from 'react'
import { ImageService } from '@/services/imageService'
import { cleanFilename } from '@/utils/files'
import { MultiFormatImageUrl } from '@/types/common'

interface ImageUploaderProps {
    value: MultiFormatImageUrl | MultiFormatImageUrl[] | null
    onChange: (value: MultiFormatImageUrl | MultiFormatImageUrl[] | null) => void
    multiple?: boolean
    uploadedImagesUrl?: string
}

const MAX_SIZE_MB = 7

export default function ImageUploader({
    value,
    onChange,
    multiple = false,
    uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_IMAGES_URL || '',
}: ImageUploaderProps) {
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const imageService = new ImageService()

    const images: any[] = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : []

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        const files = e.target.files
        if (!files || files.length === 0) return

        for (const file of Array.from(files)) {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setError(`Le fichier "${file.name}" dépasse ${MAX_SIZE_MB} Mo et a été ignoré.`)
                continue
            }

            try {
                const data = await imageService.upload(file)
                if (multiple) {
                    onChange([...images, data])
                } else {
                    // supprimer l'ancien si nécessaire
                    if (images.length > 0) await removeImageFile(0)
                    onChange(data)
                }
            } catch (err) {
                console.error('Erreur lors de l\'upload:', err)
            }
        }
        // réinitialiser le champ input pour permettre de re-sélectionner le même fichier
        if (inputRef.current) inputRef.current.value = ''
    }

    const removeImageFile = async (index?: number) => {
        const file = multiple ? images[index!] : images[0]
        if (!file) return
        const filenameCleaned = cleanFilename(file.url)
        try {
            await imageService.delete(filenameCleaned)
        } catch (err) {
            console.error('Erreur lors de la suppression du fichier:', err)
        }
    }

    const removeImage = async (index?: number) => {
        await removeImageFile(index)
        if (multiple) {
            const newImages = [...images]
            newImages.splice(index!, 1)
            onChange(newImages)
        } else {
            onChange(null)
        }
    }

    return (
        <div className="image-uploader flex flex-col gap-4">
            <input
                type="file"
                accept="image/*"
                multiple={multiple}
                ref={inputRef}
                className="hidden"
                onChange={onFileChange}
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
            >
                {multiple ? 'Choisir des images' : 'Choisir une image'}
            </button>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="preview flex flex-wrap gap-4">
                {multiple
                    ? images.map((img, idx) => (
                        <div key={idx} className="thumb relative">
                            <img
                                src={`${uploadedImagesUrl}/${img.resizedUrl}`}
                                alt="Aperçu"
                                className="max-w-[100px] border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            >
                                x
                            </button>
                        </div>
                    ))
                    : images[0] && (
                        <div className="thumb relative">
                            <img
                                src={`${uploadedImagesUrl}/${images[0].resizedUrl}`}
                                alt="Aperçu"
                                className="max-w-[100px] border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage()}
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            >
                                x
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

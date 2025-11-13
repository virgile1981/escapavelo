'use client'

import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditorType } from '@/public/assets/tinymce/tinymce'
import { useRef } from 'react'
import { imageService } from '@/services/imageService'
import { Context } from '@escapavelo/shared-types'
import { getImagesUrl } from '@escapavelo/utils'

interface TinyMCEProps {
    value: string
    onChange: (value: string) => void
    context: Context
}

export default function TinyMCEEditor({ value, onChange, context }: TinyMCEProps) {
    const editorRef = useRef<TinyMCEEditorType | null>(null)
    const uploadedImagesUrl = getImagesUrl(context);
    return (
        <Editor
            tinymceScriptSrc="/assets/tinymce/tinymce.min.js" // <- script local, pas de clé Cloud
            onInit={(_, editor) => (editorRef.current = editor)}
            initialValue={value}
            value={value}
            init={{
                height: 400,
                promotion: false, // désactive la bannière TinyMCE Cloud
                plugins: 'image table link lists preview fullscreen code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                skin_url: '/assets/tinymce/skins/ui/oxide',
                content_css: '/assets/tinymce/skins/content/default/content.css',
                automatic_uploads: false,
                file_picker_types: 'image',
                file_picker_callback: (callback: (imageUrl: string) => void) => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'

                    input.onchange = async () => {
                        const file = input.files?.[0]
                        if (!file) return

                        try {
                            const data = await imageService.upload(file, context)
                            const imageUrl = `${uploadedImagesUrl}/${data.url}`
                            callback(imageUrl)

                            // Actualiser la valeur après insertion
                            const editor = editorRef.current
                            if (editor) {
                                onChange(editor.getContent())
                            }
                        } catch (err) {
                            console.error('Erreur lors du téléchargement de l’image :', err)
                        }
                    }

                    input.click()
                },
                setup: (editor: TinyMCEEditorType) => {
                    editor.on('Change', () => {
                        onChange(editor.getContent())
                    })
                },
            }}
        />
    )
}

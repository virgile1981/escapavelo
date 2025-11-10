'use client'

import { useEffect, useRef } from 'react'
import { ImageService } from '@/services/imageService'

interface TinyMCEProps {
    value: string
    onChange: (value: string) => void
    uploadedImagesUrl?: string
}

export default function TinyMCEEditor({ value, onChange, uploadedImagesUrl = '' }: TinyMCEProps) {
    const editorRef = useRef<HTMLTextAreaElement | null>(null)
    const imageService = new ImageService()

    useEffect(() => {
        if (!editorRef.current) return

        // Charger le script TinyMCE
        const script = document.createElement('script')
        script.src = '/assets/tinymce/tinymce.min.js'
        script.onload = () => {
            // @ts-ignore
            if (window.tinymce) {
                // @ts-ignore
                window.tinymce.init({
                    target: editorRef.current,
                    height: 400,
                    promotion: false,
                    plugins: 'image table link lists preview fullscreen code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                    skin_url: '/assets/tinymce/skins/ui/oxide',
                    content_css: '/assets/tinymce/skins/content/default/content.css',
                    setup: (editor: any) => {
                        editor.on('KeyUp', () => {
                            onChange(editor.getContent())
                        })
                        editor.on('init', () => {
                            editor.setContent(value || '')
                        })
                    },
                    file_picker_callback: (callback: any) => {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        input.setAttribute('accept', 'image/*')

                        input.onchange = async () => {
                            const file = input.files ? input.files[0] : null
                            if (file) {
                                try {
                                    const data = await imageService.upload(file)
                                    const imageUrl = data.url
                                    callback(`${uploadedImagesUrl}/${imageUrl}`)
                                } catch (err) {
                                    console.error("Erreur lors du téléchargement de l'image", err)
                                }
                            } else {
                                console.error('Aucun fichier sélectionné.')
                            }
                        }

                        input.click()
                    },
                })
            }
        }

        document.head.appendChild(script)

        return () => {
            // Nettoyer TinyMCE à la destruction du composant
            // @ts-ignore
            if (window.tinymce) {
                // @ts-ignore
                window.tinymce.remove(editorRef.current)
            }
        }
    }, [uploadedImagesUrl])

    // Synchroniser les changements externes sur value
    useEffect(() => {
        // @ts-ignore
        if (window.tinymce && editorRef.current) {
            // @ts-ignore
            const editor = window.tinymce.get(editorRef.current.id)
            if (editor && value !== editor.getContent()) {
                editor.setContent(value || '')
            }
        }
    }, [value])

    return <textarea ref={editorRef} id="editor" />
}

'use client'

import { useEffect, useRef } from 'react'
import { Editor } from '@/public/assets/tinymce/tinymce'
import { imageService } from '@/services/imageService'

interface TinyMCEProps {
    value: string
    onChange: (value: string) => void
    uploadedImagesUrl: string
}

export default function TinyMCEEditor({ value, onChange, uploadedImagesUrl }: TinyMCEProps) {
    const editorRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (!editorRef.current) return
        const editorTarget = editorRef.current; // Copier la valeur locale
        // Charger le script TinyMCE
        const script = document.createElement('script')
        script.src = '/assets/tinymce/tinymce.min.js'
        script.onload = () => {
            if (window.tinymce) {
                window.tinymce.init({
                    target: editorTarget,
                    height: 400,
                    promotion: false,
                    plugins: 'image table link lists preview fullscreen code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                    skin_url: '/assets/tinymce/skins/ui/oxide',
                    content_css: '/assets/tinymce/skins/content/default/content.css',
                    setup: (editor: Editor) => {
                        editor.on('Change', () => {
                            onChange(editor.getContent())
                        })
                        editor.on('init', () => {
                            editor.setContent(value || '')
                        })
                    },
                    file_picker_callback: (callback: (imageUrl: string) => void) => {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        input.setAttribute('accept', 'image/*')

                        input.onchange = async () => {
                            const file = input.files ? input.files[0] : null
                            if (file) {
                                try {
                                    const data = await imageService.upload(file)
                                    const imageUrl = `${uploadedImagesUrl}/${data.url}`
                                    callback(imageUrl)
                                    if (window.tinymce) {
                                        const editor = editorRef.current?.id && window.tinymce.get(editorRef.current.id) as Editor
                                        if (editor) {
                                            onChange(editor.getContent()) // <-- appeler après insertion
                                        }
                                    }
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
            if (window.tinymce) {
                window.tinymce.remove(editorTarget)
            }
        }
    }, [uploadedImagesUrl])

    // Synchroniser les changements externes sur value
    useEffect(() => {
        if (window.tinymce && editorRef.current) {
            const editor = window.tinymce.get(editorRef.current.id)
            if (editor && value !== editor.getContent()) {
                editor.setContent(value || '')
            }
        }
    }, [value])

    return <textarea ref={editorRef} id="editor" />
}

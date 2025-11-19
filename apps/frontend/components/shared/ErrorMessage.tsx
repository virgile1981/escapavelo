'use client'


type ErrorMessageProps = {
    messages: string[] | undefined
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => {
    return (messages && (
        <div
            // Tailwind standard pour une alerte d'erreur rouge
            className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-100 bg-opacity-80"
            role="alert"
        >
            {messages.map((message, index) => (
                <p className="font-medium" key={index}>
                    {/* Affiche chaque message sur une nouvelle ligne (si plusieurs) */}
                    {message}
                </p>
            ))}
        </div>
    ))
}
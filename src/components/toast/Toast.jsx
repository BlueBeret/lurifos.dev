const SuccessToast = ({ message }) => {

    return (
        <div className="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-bold text-green-600">{message}</p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    )
}

const InfoToast = ({ message }) => {
    return (
        <div className="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-bold text-blue-600">{message}</p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    )
}

const WarningToast = ({ message }) => {
    return (
        <div className="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-bold text-yellow-600">{message}</p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    )
}

const ErrorToast = ({ message }) => {
    return (
        <div className="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-bold text-red-600">Error Toast Message !</p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    )
}


export { SuccessToast, InfoToast, WarningToast, ErrorToast }
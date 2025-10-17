import React, { createContext, useContext, useState, useCallback } from 'react'
import RcUpload from 'rc-upload'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload as UploadIcon, File as FileIcon, Image as ImageIcon, CheckCircle2, AlertCircle, X, Download, Loader2 } from 'lucide-react'

/** -------------------------
 *  internal constants
 * ------------------------- */
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024 // 5MB in bytes
const DEFAULT_ACCEPT_TYPES = 'image/*,.pdf,.doc,.docx,.xls,.xlsx'
const STATUS_IDLE = 'idle'
const STATUS_UPLOADING = 'uploading'
const STATUS_SUCCESS = 'success'
const STATUS_ERROR = 'error'

/** -------------------------
 *  file type helpers
 * ------------------------- */
const getFileType = fileName => {
    if (!fileName || typeof fileName !== 'string') {
        return 'other'
    }
    const extension = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        return 'image'
    }
    if (['pdf'].includes(extension)) {
        return 'pdf'
    }
    if (['doc', 'docx'].includes(extension)) {
        return 'doc'
    }
    if (['xls', 'xlsx'].includes(extension)) {
        return 'xls'
    }
    return 'other'
}

const getFileIcon = fileType => {
    switch (fileType) {
        case 'image':
            return <ImageIcon className='h-6 w-6' />
        case 'pdf':
            return <FileIcon className='h-6 w-6 text-red-500' />
        case 'doc':
            return <FileIcon className='h-6 w-6 text-blue-500' />
        case 'xls':
            return <FileIcon className='h-6 w-6 text-green-500' />
        default:
            return <FileIcon className='h-6 w-6' />
    }
}

const getPreviewUrl = file => {
    if (file.type?.startsWith('image/')) {
        return URL.createObjectURL(file)
    }
    return null
}

// Context for upload state management
const UploadContext = createContext()

/**
 * UploadProvider - Context provider for upload state management
 *
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components
 * @param {Object} props.value - Initial upload state
 * @returns {JSX.Element} The context provider JSX
 */
export const UploadProvider = ({ children, value }) => {
    return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
}

/**
 * useUpload - Custom hook to access upload context
 *
 * @returns {Object} Upload context value
 */
export const useUpload = () => {
    const context = useContext(UploadContext)
    if (!context) {
        throw new Error('useUpload must be used within an UploadProvider')
    }
    return context
}

/**
 * UploadListItem - Individual file item in the upload list
 *
 * @param {Object} props - Component properties
 * @param {Object} props.file - File object
 * @param {Function} props.onRemove - Callback to remove file
 * @param {Function} props.onRetry - Callback to retry upload
 * @param {Function} props.onDownload - Callback to download file
 * @param {string} [props.listType='text'] - List display style
 * @param {string} props.className - Additional class names
 * @returns {JSX.Element} The list item JSX
 */
export const UploadListItem = ({ file, onRemove, onRetry, onDownload, listType = 'text', className = '' }) => {
    const { status, percent, response, uid } = file

    // More comprehensive file property access for rc-upload objects
    const size = file.size || (file.file && file.file.size) || (file.originFileObj && file.originFileObj.size) || 0
    const fileName =
        file.name ||
        (file.file && file.file.name) ||
        (file.originFileObj && file.originFileObj.name) ||
        (file.webkitRelativePath && file.webkitRelativePath.split('/').pop()) ||
        'unknown'
    const fileType = getFileType(fileName)
    const previewUrl = getPreviewUrl(file.originFileObj || file)

    const formatFileSize = bytes => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getStatusIcon = () => {
        switch (status) {
            case STATUS_UPLOADING:
                return <Loader2 className='h-4 w-4 animate-spin text-blue-500' />
            case STATUS_SUCCESS:
                return <CheckCircle2 className='h-4 w-4 text-green-500' />
            case STATUS_ERROR:
                return <AlertCircle className='h-4 w-4 text-destructive' />
            default:
                return getFileIcon(fileType)
        }
    }

    if (listType === 'picture-card') {
        return (
            <div className={`relative group border rounded-lg p-2 flex flex-col items-center justify-center w-24 h-24 ${className}`}>
                {previewUrl ? (
                    <Avatar className='w-full h-full rounded-md'>
                        <AvatarImage src={previewUrl} alt={fileName} className='object-cover' />
                        <AvatarFallback className='rounded-md'>{getFileIcon(fileType)}</AvatarFallback>
                    </Avatar>
                ) : (
                    <div className='flex flex-col items-center justify-center p-2'>{getStatusIcon()}</div>
                )}

                <div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
                    {status === STATUS_SUCCESS && (
                        <>
                            <button
                                onClick={() => onDownload(file)}
                                className='text-white hover:text-gray-200 p-1 rounded-full'
                                aria-label='Download'
                            >
                                <Download className='h-4 w-4' />
                            </button>
                            <button
                                onClick={() => onRemove(file)}
                                className='text-white hover:text-gray-200 p-1 rounded-full'
                                aria-label='Remove'
                            >
                                <X className='h-4 w-4' />
                            </button>
                        </>
                    )}
                    {status === STATUS_ERROR && (
                        <button
                            onClick={() => onRetry(file)}
                            className='text-white hover:text-gray-200 p-1 rounded-full'
                            aria-label='Retry'
                        >
                            <AlertCircle className='h-4 w-4' />
                        </button>
                    )}
                </div>

                <div className='mt-1 text-xs text-center truncate w-full px-1'>{fileName}</div>
            </div>
        )
    }

    if (listType === 'picture') {
        return (
            <div className={`flex items-center gap-3 p-2 border rounded-md ${className}`}>
                {previewUrl ? (
                    <Avatar className='w-10 h-10 rounded-md'>
                        <AvatarImage src={previewUrl} alt={fileName} className='object-cover' />
                        <AvatarFallback className='rounded-md'>{getFileIcon(fileType)}</AvatarFallback>
                    </Avatar>
                ) : (
                    <div className='p-2'>{getStatusIcon()}</div>
                )}

                <div className='flex-1 min-w-0'>
                    <div className='text-sm font-medium truncate'>{fileName}</div>
                    <div className='text-xs text-muted-foreground'>{formatFileSize(size)}</div>
                </div>

                <div className='flex items-center gap-2'>
                    {status === STATUS_UPLOADING && (
                        <div className='w-20'>
                            <Progress value={percent} className='h-1.5' />
                        </div>
                    )}

                    {status === STATUS_SUCCESS && (
                        <button
                            onClick={() => onDownload(file)}
                            className='text-muted-foreground hover:text-foreground p-1 rounded-full'
                            aria-label='Download'
                        >
                            <Download className='h-4 w-4' />
                        </button>
                    )}

                    <button
                        onClick={() => onRemove(file)}
                        className='text-muted-foreground hover:text-foreground p-1 rounded-full'
                        aria-label='Remove'
                    >
                        <X className='h-4 w-4' />
                    </button>

                    {status === STATUS_ERROR && (
                        <button
                            onClick={() => onRetry(file)}
                            className='text-destructive hover:text-destructive/80 p-1 rounded-full'
                            aria-label='Retry'
                        >
                            <AlertCircle className='h-4 w-4' />
                        </button>
                    )}
                </div>
            </div>
        )
    }

    // Default 'text' listType
    return (
        <div className={`flex items-center gap-3 p-2 border rounded-md ${className}`}>
            <div className='p-1'>{getStatusIcon()}</div>

            <div className='flex-1 min-w-0'>
                <div className='text-sm font-medium truncate'>{fileName}</div>
                <div className='text-xs text-muted-foreground'>{formatFileSize(size)}</div>
            </div>

            <div className='flex items-center gap-2'>
                {status === STATUS_UPLOADING && (
                    <div className='w-20'>
                        <Progress value={percent} className='h-1.5' />
                    </div>
                )}

                {status === STATUS_SUCCESS && (
                    <button
                        onClick={() => onDownload(file)}
                        className='text-muted-foreground hover:text-foreground p-1 rounded-full'
                        aria-label='Download'
                    >
                        <Download className='h-4 w-4' />
                    </button>
                )}

                <button
                    onClick={() => onRemove(file)}
                    className='text-muted-foreground hover:text-foreground p-1 rounded-full'
                    aria-label='Remove'
                >
                    <X className='h-4 w-4' />
                </button>

                {status === STATUS_ERROR && (
                    <button
                        onClick={() => onRetry(file)}
                        className='text-destructive hover:text-destructive/80 p-1 rounded-full'
                        aria-label='Retry'
                    >
                        <AlertCircle className='h-4 w-4' />
                    </button>
                )}
            </div>
        </div>
    )
}

/**
 * UploadList - List container for uploaded files
 *
 * @param {Object} props - Component properties
 * @param {Array} props.fileList - Array of file objects
 * @param {Function} props.onRemove - Callback to remove file
 * @param {Function} props.onRetry - Callback to retry upload
 * @param {Function} props.onDownload - Callback to download file
 * @param {string} [props.listType='text'] - List display style
 * @param {string} props.className - Additional class names
 * @returns {JSX.Element} The list JSX
 */
export const UploadList = ({ fileList, onRemove, onRetry, onDownload, listType = 'text', className = '' }) => {
    if (!fileList || fileList.length === 0) {
        return null
    }

    const containerClasses = listType === 'picture-card' ? `flex flex-wrap gap-2 ${className}` : `space-y-2 ${className}`

    return (
        <div className={containerClasses}>
            {fileList.map(file => (
                <UploadListItem
                    key={file.uid || file.id}
                    file={file}
                    onRemove={onRemove}
                    onRetry={onRetry}
                    onDownload={onDownload}
                    listType={listType}
                    className={className}
                />
            ))}
        </div>
    )
}

/**
 * UploadDragger - Drag and drop zone component
 *
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components
 * @param {boolean} [props.disabled=false] - Disable drag functionality
 * @param {string} props.className - Additional class names
 * @param {Object} props.uploadProps - Props for the upload component
 * @returns {JSX.Element} The dragger JSX
 */
export const UploadDragger = ({ children, disabled = false, className = '', uploadProps }) => {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = useCallback(
        e => {
            e.preventDefault()
            if (!disabled) {
                setIsDragOver(true)
            }
        },
        [disabled]
    )

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback(() => {
        setIsDragOver(false)
    }, [])

    const draggerClasses = `border-2 border-dashed rounded-lg p-8 text-center transition-all
    ${isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-primary/5'}
    ${className}`

    return (
        <div className={draggerClasses} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <div className='flex flex-col items-center justify-center gap-3'>
                <UploadIcon className='h-10 w-10 text-muted-foreground' />
                <div className='space-y-1'>
                    <p className='text-sm font-medium'>Click to upload or drag and drop</p>
                    <p className='text-xs text-muted-foreground'>Supports various file types</p>
                </div>
                {children}
            </div>
        </div>
    )
}

/**
 * UploadButton - Upload button with various styles
 *
 * @param {Object} props - Component properties
 * @param {string} [props.size='md'] - Button size
 * @param {string} [props.variant='default'] - Button variant
 * @param {boolean} [props.iconOnly=false] - Show only icon without text
 * @param {string} props.className - Additional class names
 * @param {ReactNode} props.children - Child components
 * @param {Object} props.uploadProps - Props for the upload component
 * @returns {JSX.Element} The button JSX
 */
export const UploadButton = ({ size = 'md', variant = 'default', iconOnly = false, className = '', children, uploadProps }) => {
    return (
        <Button size={size} variant={variant} className={className} {...uploadProps}>
            <UploadIcon className='h-4 w-4 mr-2' />
            {!iconOnly && (children || 'Upload File')}
        </Button>
    )
}

/**
 * UploadComponent - Wrapper component handling core upload logic
 *
 * @param {Object} props - Component properties
 * @param {string} props.action - Upload endpoint URL
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file selection
 * @param {string} [props.accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"] - Accepted file types
 * @param {number} [props.maxSize=5242880] - Maximum file size in bytes (default 5MB)
 * @param {Function} [props.onChange] - Callback when file list changes
 * @param {Function} [props.onSuccess] - Callback when upload succeeds
 * @param {Function} [props.onError] - Callback when upload fails
 * @param {Function} [props.onRemove] - Callback when file is removed
 * @param {Function} [props.beforeUpload] - Validation hook (optional)
 * @param {string} [props.className=''] - Additional class names
 * @param {boolean} [props.disabled=false] - Disable the upload
 * @param {ReactNode} [props.children] - Custom content to render instead of default UI
 * @param {string} [props.listType='text'] - List display style
 * @param {boolean} [props.showUploadList=true] - Show file list (default: true)
 * @returns {JSX.Element} The upload component JSX
 */
export const UploadComponent = ({
    action,
    multiple = false,
    accept = DEFAULT_ACCEPT_TYPES,
    maxSize = DEFAULT_MAX_SIZE,
    onChange,
    onSuccess,
    onError,
    onRemove,
    beforeUpload,
    className = '',
    disabled = false,
    children,
    listType = 'text',
    showUploadList = true,
}) => {
    const [fileList, setFileList] = useState([])

    // Generate unique ID for file
    const generateUid = () => uuidv4()

    // Handle file status changes
    const updateFileList = (uid, updates) => {
        setFileList(prev => prev.map(file => (file.uid === uid ? { ...file, ...updates } : file)))
    }

    // Validate file before upload
    const validateFile = file => {
        // Check file type
        if (accept) {
            const acceptTypes = accept.split(',').map(type => type.trim())
            const fileType = file.type || ''
            const fileName = (file.name || 'unknown').toLowerCase()

            const isAccepted = acceptTypes.some(acceptType => {
                if (acceptType.startsWith('.')) {
                    // File extension check
                    return fileName.endsWith(acceptType)
                } else if (acceptType.endsWith('/*')) {
                    // MIME type wildcard check
                    const baseType = acceptType.slice(0, -1) // Remove the '*'
                    return fileType.startsWith(baseType)
                } else {
                    // Exact MIME type check
                    return fileType === acceptType
                }
            })

            if (!isAccepted) {
                onError?.(new Error(`File type not accepted: ${file.type || 'unknown'}`), file)
                return false
            }
        }

        // Check file size
        if ((file.size || 0) > maxSize) {
            onError?.(new Error(`File size exceeds limit: ${maxSize} bytes`), file)
            return false
        }

        return true
    }

    // Add file to list
    const addFileToList = file => {
        const newFile = {
            ...file,
            uid: generateUid(),
            status: STATUS_IDLE,
            percent: 0,
        }

        setFileList(prev => [...prev, newFile])
        return newFile
    }

    // Remove file from list
    const removeFile = file => {
        setFileList(prev => prev.filter(f => f.uid !== file.uid))
        if (onRemove) onRemove(file)
    }

    // Retry upload
    const retryUpload = file => {
        // Re-add the file to the upload queue
        const newFile = addFileToList(file.originFileObj || file)
        // Trigger upload again
        uploadFile(newFile)
    }

    // Download file
    const downloadFile = file => {
        if (file.response && file.response.url) {
            const link = document.createElement('a')
            link.href = file.response.url
            link.download = file.name || 'download'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else if (file.originFileObj) {
            const url = URL.createObjectURL(file.originFileObj)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name || file.originFileObj.name || 'download'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }
    }

    // Handle file upload
    const uploadFile = async file => {
        if (!validateFile(file.originFileObj || file)) {
            updateFileList(file.uid, {
                status: STATUS_ERROR,
                error: 'File validation failed',
            })
            return
        }

        // Run beforeUpload if provided
        if (beforeUpload) {
            try {
                const result = await beforeUpload(file.originFileObj || file)
                if (result === false) {
                    // Upload was cancelled
                    removeFile(file)
                    return
                }
            } catch (error) {
                onError?.(error, file)
                updateFileList(file.uid, {
                    status: STATUS_ERROR,
                    error: error.message,
                })
                return
            }
        }

        // Update status to uploading
        updateFileList(file.uid, { status: STATUS_UPLOADING })

        try {
            // Create FormData for the upload
            const formData = new FormData()
            formData.append('file', file.originFileObj || file)

            // Upload the file
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`)
            }

            const data = await response.json()

            // Update file status to success
            updateFileList(file.uid, {
                status: STATUS_SUCCESS,
                response: data,
                percent: 100,
            })

            onSuccess?.(data, file)
            onChange?.([...fileList])
        } catch (error) {
            // Update file status to error
            updateFileList(file.uid, {
                status: STATUS_ERROR,
                error: error.message,
            })

            onError?.(error, file)
        }
    }

    // RcUpload onChange handler
    const handleRcUploadChange = info => {
        // Update file list based on rc-upload info - merge rc-upload's file info with our state
        // This ensures we keep files that were added via addFileToList and update their status
        console.log('info', info)

        setFileList(prevFileList => {
            const rcUploadFiles = info.fileList

            // Create a map of rc-upload files by their original file reference or unique identifier
            const rcFilesMap = new Map()
            rcUploadFiles.forEach(f => {
                // Use the originalFileObj, name, and size as identifier to match files
                const key = f.originFileObj
                    ? `${f.originFileObj.name}-${f.originFileObj.size}`
                    : f.name
                    ? `${f.name}-${f.size}`
                    : f.uid || f.id || generateUid()
                rcFilesMap.set(key, {
                    ...f,
                    status:
                        f.status === 'uploading'
                            ? STATUS_UPLOADING
                            : f.status === 'done'
                            ? STATUS_SUCCESS
                            : f.status === 'error'
                            ? STATUS_ERROR
                            : f.status || STATUS_IDLE,
                    uid: f.uid || f.id || generateUid(),
                    percent: f.percent || 0,
                })
            })

            // Update existing files in our state with rc-upload info, or add new ones
            const updatedList = prevFileList.map(existingFile => {
                const key = existingFile.originFileObj
                    ? `${existingFile.originFileObj.name}-${existingFile.originFileObj.size}`
                    : existingFile.name
                    ? `${existingFile.name}-${existingFile.size}`
                    : existingFile.uid || existingFile.id

                if (rcFilesMap.has(key)) {
                    // Update with rc-upload's version while preserving the uid we originally assigned
                    const rcFile = rcFilesMap.get(key)
                    return {
                        ...existingFile, // Keep our original file structure
                        ...rcFile, // Override with rc-upload's status and updates
                        uid: existingFile.uid, // Preserve the uid we originally set
                    }
                }
                return existingFile
            })

            // Add any new files that are in rc-upload but not in our existing list
            rcUploadFiles.forEach(f => {
                const key = f.originFileObj
                    ? `${f.originFileObj.name}-${f.originFileObj.size}`
                    : f.name
                    ? `${f.name}-${f.size}`
                    : f.uid || f.id

                const exists = updatedList.some(ef => {
                    const existingKey = ef.originFileObj
                        ? `${ef.originFileObj.name}-${ef.originFileObj.size}`
                        : ef.name
                        ? `${ef.name}-${ef.size}`
                        : ef.uid || ef.id
                    return existingKey === key
                })

                if (!exists) {
                    updatedList.push({
                        ...f,
                        status:
                            f.status === 'uploading'
                                ? STATUS_UPLOADING
                                : f.status === 'done'
                                ? STATUS_SUCCESS
                                : f.status === 'error'
                                ? STATUS_ERROR
                                : f.status || STATUS_IDLE,
                        uid: f.uid || f.id || generateUid(),
                        percent: f.percent || 0,
                    })
                }
            })

            return updatedList
        })

        onChange?.(info.fileList)
    }

    // RcUpload props
    const rcUploadProps = {
        action,
        multiple,
        accept,
        disabled,
        onChange: handleRcUploadChange,
        beforeUpload: file => {
            // Validate file before adding to list
            if (!validateFile(file)) {
                return false
            }

            // Add file to our internal list immediately for UI feedback
            addFileToList(file)

            // Return true to allow rc-upload to proceed
            return true
        },
        onProgress: (percent, file) => {
            updateFileList(file.uid, {
                status: STATUS_UPLOADING,
                percent: Math.round(percent),
            })
        },
        onSuccess: (response, file) => {
            updateFileList(file.uid, {
                status: STATUS_SUCCESS,
                response,
                percent: 100,
                file,
            })
            onSuccess?.(response, file)
        },
        onError: (error, file) => {
            updateFileList(file.uid, {
                status: STATUS_ERROR,
                error: error?.message || 'Upload failed',
            })
            onError?.(error, file)
        },
    }

    return (
        <div className={`space-y-3 ${className}`}>
            <RcUpload {...rcUploadProps}>
                {children || (
                    <UploadDragger uploadProps={rcUploadProps} disabled={disabled}>
                        <p className='text-sm text-muted-foreground'>Click or drag files to upload</p>
                    </UploadDragger>
                )}
            </RcUpload>

            {showUploadList && (
                <UploadList fileList={fileList} onRemove={removeFile} onRetry={retryUpload} onDownload={downloadFile} listType={listType} />
            )}
        </div>
    )
}

/**
 * Uploadx - Main component combining all upload functionality
 *
 * @param {Object} props - Component properties
 * @param {string} props.action - Upload endpoint URL
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file selection
 * @param {string} [props.accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"] - Accepted file types
 * @param {number} [props.maxSize=5242880] - Maximum file size in bytes (default 5MB)
 * @param {Function} [props.onChange] - Callback when file list changes
 * @param {Function} [props.onSuccess] - Callback when upload succeeds
 * @param {Function} [props.onError] - Callback when upload fails
 * @param {Function} [props.onRemove] - Callback when file is removed
 * @param {Function} [props.beforeUpload] - Validation hook (optional)
 * @param {string} [props.className=''] - Additional class names
 * @param {boolean} [props.disabled=false] - Disable the upload
 * @param {ReactNode} [props.children] - Custom content to render instead of default UI
 * @param {string} [props.listType='text'] - List display style
 * @param {boolean} [props.showUploadList=true] - Show file list (default: true)
 * @returns {JSX.Element} The main upload component JSX
 */
export const Uploadx = props => {
    return (
        <UploadProvider>
            <UploadComponent {...props} />
        </UploadProvider>
    )
}

// Export all components as default and named exports
export default Uploadx

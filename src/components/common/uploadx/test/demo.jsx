import React, { useState } from 'react'
import { Uploadx, UploadButton, UploadDragger } from '../index'

const Demo = () => {
    const [fileList, setFileList] = useState([])

    const handleUploadChange = newFileList => {
        console.log('File list changed:', newFileList)
        setFileList(newFileList)
    }

    const handleUploadSuccess = (response, file) => {
        console.log('Upload succeeded:', response, file)
    }

    const handleUploadError = (error, file) => {
        console.error('Upload failed:', error, file)
    }

    const handleRemove = file => {
        console.log('File removed:', file)
    }

    const customValidator = file => {
        // Custom validation: only allow images smaller than 2MB
        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed!')
            return false
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB!')
            return false
        }

        return true
    }

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>Uploadx Component Demo</h1>

            {/* Basic Upload */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Basic Upload</h2>
                <Uploadx
                    action='https://httpbin.org/post'
                    onChange={handleUploadChange}
                    onSuccess={handleUploadSuccess}
                    onError={handleUploadError}
                    onRemove={handleRemove}
                />
            </section>

            {/* Upload with Button */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Upload with Custom Button</h2>
                <Uploadx action='https://httpbin.org/post' listType='picture' onChange={handleUploadChange}>
                    <UploadButton>Click to Upload</UploadButton>
                </Uploadx>
            </section>

            {/* Picture List Type */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Picture List Type</h2>
                <Uploadx action='https://httpbin.org/post' listType='picture' accept='image/*' onChange={handleUploadChange}>
                    <UploadButton variant='outline'>Upload Images</UploadButton>
                </Uploadx>
            </section>

            {/* Picture Card List Type */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Picture Card List Type</h2>
                <Uploadx action='https://httpbin.org/post' listType='picture-card' multiple onChange={handleUploadChange}>
                    <div className='text-center'>
                        <p className='mb-2'>Click or drag files to upload</p>
                        <p className='text-sm text-gray-500'>Supports various file types</p>
                    </div>
                </Uploadx>
            </section>

            {/* Multiple Files */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Multiple Files Upload</h2>
                <Uploadx action='https://httpbin.org/post' multiple onChange={handleUploadChange}>
                    <UploadDragger>
                        <p className='text-sm text-gray-500'>Drag and drop multiple files here</p>
                    </UploadDragger>
                </Uploadx>
            </section>

            {/* Custom Validation */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Custom Validation</h2>
                <Uploadx
                    action='https://httpbin.org/post'
                    beforeUpload={customValidator}
                    accept='image/*'
                    maxSize={2 * 1024 * 1024} // 2MB
                    onChange={handleUploadChange}
                >
                    <UploadButton variant='secondary'>Upload Image (Max 2MB)</UploadButton>
                </Uploadx>
            </section>

            {/* Disabled Upload */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Disabled Upload</h2>
                <Uploadx action='https://httpbin.org/post' disabled onChange={handleUploadChange}>
                    <UploadButton disabled>Upload (Disabled)</UploadButton>
                </Uploadx>
            </section>

            {/* Current File List */}
            <section className='border rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-4'>Current File List</h2>
                {fileList.length > 0 ? (
                    <div className='space-y-2'>
                        {fileList.map(file => (
                            <div key={file.uid} className='flex justify-between items-center p-2 border rounded'>
                                <span>{file.name}</span>
                                <span className='text-sm text-gray-500 capitalize'>{file.status}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500'>No files uploaded yet</p>
                )}
            </section>
        </div>
    )
}

export default Demo

// frontend/src/hooks/useImageCropper.js
import { useState, useRef, useCallback } from 'react';

export const useImageCropper = () => {
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [cropperReady, setCropperReady] = useState(false);
    const fileInputRef = useRef(null);
    const cropperImageRef = useRef(null);
    const cropperInstanceRef = useRef(null);

    const handlePhotoChange = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChange = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size exceeds 5MB');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('Please select a valid image file');
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageToCrop(e.target.result);
            setIsCropModalOpen(true);
        };
        reader.onerror = () => {
            throw new Error('Failed to read image file');
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    }, []);

    const initializeCropper = useCallback(() => {
        if (!cropperImageRef.current || !imageToCrop) return;

        // Import cropper dynamically to avoid CSS issues
        import('cropperjs').then((Cropper) => {
            if (cropperInstanceRef.current) {
                cropperInstanceRef.current.destroy();
            }

            try {
                const cropper = new Cropper.default(cropperImageRef.current, {
                    aspectRatio: 1,
                    viewMode: 1,
                    autoCropArea: 0.8,
                    ready: () => {
                        setCropperReady(true);
                    }
                });
                cropperInstanceRef.current = cropper;
            } catch (error) {
                console.error('Cropper initialization failed:', error);
                throw new Error('Failed to initialize image editor');
            }
        });
    }, [imageToCrop]);

    const getCroppedImage = useCallback(async () => {
        if (!cropperInstanceRef.current) {
            throw new Error('Image editor not ready');
        }

        const canvas = cropperInstanceRef.current.getCroppedCanvas({
            width: 256,
            height: 256,
            fillColor: '#fff'
        });

        if (!canvas) {
            throw new Error('Failed to crop image');
        }

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.9);
        });
    }, []);

    const cancelCrop = useCallback(() => {
        setIsCropModalOpen(false);
        setImageToCrop(null);
        setCropperReady(false);
        if (cropperInstanceRef.current) {
            cropperInstanceRef.current.destroy();
            cropperInstanceRef.current = null;
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    return {
        isCropModalOpen,
        imageToCrop,
        cropperReady,
        fileInputRef,
        cropperImageRef,
        handlePhotoChange,
        handleFileInputChange,
        initializeCropper,
        getCroppedImage,
        cancelCrop,
        setCropperReady
    };
};
// frontend/src/hooks/useSimpleImageCropper.js
import { useState, useRef, useCallback } from 'react';

export const useSimpleImageCropper = () => {
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [originalImage, setOriginalImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handlePhotoChange = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChange = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (JPEG, PNG, or WebP)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setOriginalImage(e.target.result);
            setIsCropModalOpen(true);
            
            // Reset crop area to center
            setTimeout(() => {
                setCrop({
                    x: 100,
                    y: 100,
                    width: 200,
                    height: 200
                });
            }, 100);
        };
        reader.onerror = () => {
            alert('Failed to read image file');
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    }, []);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - crop.x,
            y: e.clientY - crop.y
        });
    }, [crop]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Boundary checks
        const boundedX = Math.max(0, Math.min(newX, 400 - crop.width));
        const boundedY = Math.max(0, Math.min(newY, 400 - crop.height));
        
        setCrop(prev => ({
            ...prev,
            x: boundedX,
            y: boundedY
        }));
    }, [isDragging, dragStart, crop.width, crop.height]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const applyCropManually = useCallback(() => {
        if (!originalImage || !canvasRef.current) return null;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        return new Promise((resolve) => {
            img.onload = () => {
                // Set canvas size
                canvas.width = 256;
                canvas.height = 256;
                
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Calculate scale (we're working with a 400x400 preview, but original image might be different)
                const scale = img.width / 400;
                
                // Draw cropped portion
                ctx.drawImage(
                    img,
                    crop.x * scale,
                    crop.y * scale,
                    crop.width * scale,
                    crop.height * scale,
                    0,
                    0,
                    256,
                    256
                );
                
                // Convert to blob
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.9);
            };
            img.src = originalImage;
        });
    }, [originalImage, crop]);

    const cancelCrop = useCallback(() => {
        setIsCropModalOpen(false);
        setOriginalImage(null);
        setCroppedImage(null);
        setCrop({ x: 0, y: 0, width: 200, height: 200 });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    return {
        isCropModalOpen,
        originalImage,
        fileInputRef,
        handlePhotoChange,
        handleFileInputChange,
        applyCropManually,
        cancelCrop,
        // For manual cropping
        crop,
        setCrop,
        isDragging,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        canvasRef
    };
};
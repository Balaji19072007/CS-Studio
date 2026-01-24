// frontend/src/hooks/useSimpleImageCropper.js
import { useState, useRef, useCallback } from 'react';

export const useSimpleImageCropper = () => {
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [originalImage, setOriginalImage] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });

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
            const img = new Image();
            img.onload = () => {
                setImageDimensions({ width: img.width, height: img.height });
                const imgScale = Math.min(400 / img.width, 400 / img.height);
                setScale(imgScale);
                setOriginalImage(e.target.result);
                setIsCropModalOpen(true);

                // Reset crop area to center square
                setTimeout(() => {
                    const cropSize = Math.min(img.width, img.height);
                    const centerX = Math.max(0, (img.width - cropSize) / 2);
                    const centerY = Math.max(0, (img.height - cropSize) / 2);
                    setCrop({
                        x: centerX,
                        y: centerY,
                        width: cropSize,
                        height: cropSize
                    });
                }, 100);
            };
            img.src = e.target.result;
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
            x: e.clientX,
            y: e.clientY
        });
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !originalImage) return;

        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newX = crop.x + deltaX / scale;
        const newY = crop.y + deltaY / scale;

        // Boundary checks - ensure crop area stays within image bounds
        const maxX = imageDimensions.width - crop.width;
        const maxY = imageDimensions.height - crop.height;

        const boundedX = Math.max(0, Math.min(newX, maxX));
        const boundedY = Math.max(0, Math.min(newY, maxY));

        setCrop(prev => ({
            ...prev,
            x: boundedX,
            y: boundedY
        }));
        setDragStart({ x: e.clientX, y: e.clientY }); // Update drag start to avoid accumulation errors
    }, [isDragging, dragStart, crop, originalImage, imageDimensions, scale]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleResizeMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeStart({
            circleSize: crop.width * scale, // circleSize in screen pixels
            x: e.clientX,
            y: e.clientY
        });
    }, [crop, scale]);

    const handleResizeMouseMove = useCallback((e) => {
        if (!isResizing || !originalImage) return;

        const deltaX = e.clientX - resizeStart.x;
        const newCircleSizeScreen = Math.max(50 * scale, resizeStart.circleSize + deltaX); // Min 50px visual
        const newCropSize = newCircleSizeScreen / scale;

        // Enforce boundaries
        const maxCropSize = Math.min(imageDimensions.width - crop.x, imageDimensions.height - crop.y);
        const finalCropSize = Math.min(newCropSize, maxCropSize);

        setCrop(prev => ({
            ...prev,
            width: finalCropSize,
            height: finalCropSize
        }));
    }, [isResizing, resizeStart, originalImage, imageDimensions, crop.x, crop.y, scale]);

    const handleResizeMouseUp = useCallback(() => {
        setIsResizing(false);
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

                // Draw cropped portion
                ctx.drawImage(
                    img,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
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
        setImageDimensions({ width: 0, height: 0 });
        setScale(1);
        setCrop({ x: 0, y: 0, width: 200, height: 200 });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    return {
        isCropModalOpen,
        originalImage,
        imageDimensions,
        scale,
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
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp,
        canvasRef,
        imageRef
    };
};
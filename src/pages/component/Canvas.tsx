import { useEffect, useRef, useState } from 'react';
import "./css/Canvas.scss"
import { DragLine } from './DragLine';

interface CanvasProps {
    src: string;
}
const Canvas = ({ src }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            // 圖片真的寬高
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
            setImage(img);
            setImageRange({
                left: 0,
                right: img.width / 2,
                top: 0,
                bottom: img.height / 2,
            });
        };
    }, [src]);


    // drag Canvas
    const [isDragging, setIsDragging] = useState(false);
    const [imageRange, setImageRange] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
    // 紀錄最後一次的滑鼠座標 目的是為了計算滑鼠移動的距離
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    // 確認是第一次拖移
    const [firstDrag, setFirstDrag] = useState(true);

    // 滑鼠移動的 timer

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            if (isDragging && image) {

                // 滑鼠不能超過視窗範圍
                if (e.clientX < 0 || e.clientX > window.innerWidth - 1 || e.clientY < 0 || e.clientY > window.innerHeight - 1) {
                    return;
                }
                const canvasRect = canvas.getBoundingClientRect();
                // console.log(canvasX, canvasY);
                // 滑鼠在 canvas 上的座標
                const mouseCanvasX = ((e.clientX - canvasRect.left) / canvasRect.width) * canvas.width;
                const mouseCanvasY = ((e.clientY - canvasRect.top) / canvasRect.height) * canvas.height;

                // 如果在圖片範圍內，才動
                if (mouseCanvasX > imageRange.left && mouseCanvasX < imageRange.right && mouseCanvasY > imageRange.top && mouseCanvasY < imageRange.bottom) {
                    // 滑鼠移動的距離
                    let deltaX = mouseCanvasX - lastMousePosition.x;
                    let deltaY = mouseCanvasY - lastMousePosition.y;

                    // 第一次拖移
                    if (firstDrag) {
                        deltaX = 0;
                        deltaY = 0;
                        setLastMousePosition({ x: mouseCanvasX, y: mouseCanvasY });
                        setFirstDrag(false);
                    }

                    requestAnimationFrame(() => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // 圖片左上角的座標 + 滑鼠移動的距離
                        ctx.drawImage(image, imageRange.left, imageRange.top, imageRange.right - imageRange.left, imageRange.bottom - imageRange.top);
                    });

                    // 如果 圖片左上角的座標 + 滑鼠移動的距離 < 0 就把滑鼠移動的距離設為 0
                    if (imageRange.left + deltaX < 0) {
                        deltaX = -imageRange.left;
                    }
                    if (imageRange.top + deltaY < 0) {
                        deltaY = -imageRange.top;
                    }
                    // 如果 圖片右下角的座標 + 滑鼠移動的距離 > canvas 範圍 就把滑鼠移動的距離設為 canvas 範圍 - 圖片右下角的座標
                    // 但說穿了就是圖片不能超過 canvas 範圍
                    // 也可以說deltaX 會等於0 
                    if (imageRange.right + deltaX > canvas.width) {
                        deltaX = 0;
                    }
                    if (imageRange.bottom + deltaY > canvas.height) {
                        deltaY = 0;
                    }

                    setImageRange({
                        left: imageRange.left + deltaX,
                        right: imageRange.right + deltaX,
                        top: imageRange.top + deltaY,
                        bottom: imageRange.bottom + deltaY,
                    });
                    setLastMousePosition({ x: mouseCanvasX, y: mouseCanvasY });
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            // 重置
            setFirstDrag(true);
        };

        // 如果滑鼠移出視窗，就停止拖移
        const handleMouseLeave = () => {
            setIsDragging(false);
            // 重置
            setFirstDrag(true);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [firstDrag, image, imageRange, isDragging, lastMousePosition.x, lastMousePosition.y]);


    // 當滑鼠在 線 上按下時，就開始拖移
    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        // 重製
        setFirstDrag(true);
        console.log("---------------------------------------------")
    };


    return (
        <div className='result'>
            <canvas
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
            />
            <DragLine />
        </div>
    );
};

export default Canvas;
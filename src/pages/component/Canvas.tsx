// import { useEffect, useRef, useState } from 'react';
// import "./css/Canvas.scss"
// import { DragLine } from './DragLine';

// interface CanvasProps {
//     src: string;
// }
// const Canvas = ({ src }: CanvasProps) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const img = new Image();
//         img.src = src;
//         img.onload = () => {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             // ctx.drawImage(img, 0, 0);

//             // draw the image on the canvas
//             ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);

//         };

//     }, [src]);


//     // drag Canvas
//     const [isDragging, setIsDragging] = useState(false);
//     const [transform, setTransform] = useState("translate3d(0, 0, 0)");

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (isDragging) {
//                 const canvasWidth = canvasRef.current?.offsetWidth || 0;
//                 const deltaX = e.clientX - canvasWidth / 2;
//                 const canvasHeight = canvasRef.current?.offsetHeight || 0;
//                 const deltaY = e.clientY - canvasHeight / 2;

//                 // 如果超過左邊界，就不動
//                 if (deltaX < 0) {
//                     return;
//                 }
//                 // 如果超過右邊界，就不動
//                 console.log(deltaX, window.innerWidth - 1)
//                 if (deltaX > window.innerWidth - 1) {
//                     return;
//                 }

//                 requestAnimationFrame(() => {
//                     const newTransform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
//                     // console.log(newTransform)
//                     setTransform(newTransform);
//                 });

//             }
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//         };

//         // 如果滑鼠移出視窗，就停止拖移
//         const handleMouseLeave = () => {
//             setIsDragging(false);
//         };

//         document.addEventListener("mousemove", handleMouseMove);
//         document.addEventListener("mouseup", handleMouseUp);
//         document.addEventListener("mouseleave", handleMouseLeave);

//         return () => {
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//             document.removeEventListener("mouseleave", handleMouseLeave);

//         };
//     }, [isDragging]);

//     useEffect(() => {
//         // console.log("transform: ", transform)
//         if (canvasRef.current) {
//             canvasRef.current.style.transform = transform;
//         }

//     }, [transform]);

//     // 當滑鼠在 線 上按下時，就開始拖移
//     const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//         // console.log("line mouse down")
//         setIsDragging(true);
//     };


//     return (
//         <div className='result'>
//             <canvas
//                 ref={canvasRef}
//                 style={{ transform }}
//                 onMouseDown={handleCanvasMouseDown}
//             />
//             <DragLine />
//         </div>
//     );
// };

// export default Canvas;


/////////////////////////////////////////// 版本二 ///////////////////////////////////////////
//// 不夠好
// import { useRef, useEffect, useState } from "react";
// import { DragLine } from './DragLine';

// interface CanvasProps {
//     src: string;
// }

// const Canvas = ({ src }: CanvasProps) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [transform, setTransform] = useState("translate3d(0, 0, 0)");

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const img = new Image();
//         img.src = src;
//         img.onload = () => {
//             // draw the image on the canvas as the background
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         };
//     }, [src]);

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (isDragging) {
//                 const canvasWidth = canvasRef.current?.offsetWidth || 0;
//                 const deltaX = e.clientX - canvasWidth / 2;
//                 const canvasHeight = canvasRef.current?.offsetHeight || 0;
//                 const deltaY = e.clientY - canvasHeight / 2;

//                 // 如果超過左邊界，就不動
//                 if (deltaX < 0) {
//                     return;
//                 }
//                 // 如果超過右邊界，就不動
//                 if (deltaX > window.innerWidth - 1) {
//                     return;
//                 }

//                 requestAnimationFrame(() => {
//                     const newTransform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
//                     setTransform(newTransform);
//                 });
//             }
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//         };

//         // 如果滑鼠移出視窗，就停止拖移
//         const handleMouseLeave = () => {
//             setIsDragging(false);
//         };

//         document.addEventListener("mousemove", handleMouseMove);
//         document.addEventListener("mouseup", handleMouseUp);
//         document.addEventListener("mouseleave", handleMouseLeave);

//         return () => {
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//             document.removeEventListener("mouseleave", handleMouseLeave);
//         };
//     }, [isDragging]);

//     useEffect(() => {
//         if (canvasRef.current) {
//             canvasRef.current.style.transform = transform;
//         }
//     }, [transform]);

//     // 當滑鼠在 canvas 上按下時，就開始拖移
//     const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//         setIsDragging(true);
//     };

//     return (
//         <div className="result">
//             <canvas
//                 ref={canvasRef}
//                 style={{ background: `url(${src})`, backgroundSize: "cover" }}
//                 onMouseDown={handleCanvasMouseDown}
//             />
//             <DragLine />
//         </div>
//     );
// };

// export default Canvas;


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
            setLastMousePos({
                left: 0,
                right: img.width / 2,
                top: 0,
                bottom: img.height / 2,
            });
        };
    }, [src]);


    // drag Canvas
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousPos, setLastMousePos] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            if (isDragging && image) {
                // 如果超過左邊界，就不動
                if (e.clientX < 0) {
                    return;
                }
                // 如果超過右邊界，就不動
                if (e.clientX > window.innerWidth - 1) {
                    return;
                }

                const canvasRect = canvas.getBoundingClientRect();
                // 滑鼠在 canvas 上的座標
                const mouseCanvasX = ((e.clientX - canvasRect.left) / canvasRect.width) * canvas.width;
                const mouseCanvasY = ((e.clientY - canvasRect.top) / canvasRect.height) * canvas.height;
                // 如果在圖片範圍內，才動
                if (mouseCanvasX > lastMousPos.left && mouseCanvasX < lastMousPos.right && mouseCanvasY > lastMousPos.top && mouseCanvasY < lastMousPos.bottom) {
                    requestAnimationFrame(() => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // 以滑鼠為中心，繪製圖片
                        ctx.drawImage(image, mouseCanvasX - image.width / 4, mouseCanvasY - image.height / 4, image.width / 2, image.height / 2)                        
                    });
                    setLastMousePos({
                        left: mouseCanvasX - image.width / 4,
                        right: mouseCanvasX + image.width / 4,
                        top: mouseCanvasY - image.height / 4,
                        bottom: mouseCanvasY + image.height / 4,
                    });
                }


            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);           
        };

        // 如果滑鼠移出視窗，就停止拖移
        const handleMouseLeave = () => {
            setIsDragging(false);
        };


        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);

        };
    }, [image, isDragging, lastMousPos.bottom, lastMousPos.left, lastMousPos.right, lastMousPos.top]);


    // 當滑鼠在 線 上按下時，就開始拖移
    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
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
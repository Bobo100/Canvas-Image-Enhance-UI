import { useNavigate } from "react-router-dom";
import InputImage from "./component/InputImage";
import "./css/Home.scss";
import image from "../image/dmitry-demidko-eBWzFKahEaU-unsplash.jpg"


export const Home = () => {
    const navigate = useNavigate();
    const handleFileChange = (value: string) => {
        navigate('/result', { state: { value } });
        // navigate('/result', { state: { image: value } });

    };

    function downloadImage() {
        // Create a new anchor element
        const link = document.createElement('a');
        // Set the href attribute of the anchor element to the image URL
        link.href = image;
        // Set the download attribute of the anchor element to the file name you want to save
        link.download = 'dmitry-demidko-eBWzFKahEaU-unsplash.jpg';
        // Trigger a click event on the anchor element
        // This will automatically download the image
        link.click();
    }

    return (
        <div className="home">
            <button onClick={downloadImage} >Download</button>
            <InputImage labelId="image" placeholderText="請選擇圖片" onChange={handleFileChange} />
        </div>
    );
};

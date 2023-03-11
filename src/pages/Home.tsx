import { useNavigate } from "react-router-dom";
import InputImage from "./component/InputImage";
import "./css/Home.scss";


export const Home = () => {
    const navigate = useNavigate();
    const handleFileChange = (value: string) => {
        navigate('/result', { state: { value } });
        // navigate('/result', { state: { image: value } });

    };
    return (
        <div className="home">
            <InputImage labelId="image" placeholderText="請選擇圖片" onChange={handleFileChange} />
        </div>
    );
};

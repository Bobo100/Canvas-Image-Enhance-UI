import { useLocation } from "react-router-dom";
import Canvas from "./component/Canvas";
import "./css/ResultPage.scss";


const ResultPage = () => {
    const location = useLocation();
    // const image = location.state as string;
    const image = location.state?.value;

    //把圖片放到canvas上
    // 如果沒有圖片，就不顯示canvas 而顯示提示
    return (
        <div className="result-page">
            {image ? <Canvas src={image} /> : <div className="no-image">請先選擇圖片</div>}
        </div>
    );
};

export default ResultPage;

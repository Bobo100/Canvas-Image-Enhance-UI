import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from './pages/Home';
import ResultPage from './pages/ResultPage';
import { NotFoundPage } from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router basename="/Canvas-Image-Enhance-UI">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

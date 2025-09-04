import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './BuyerPage';
import SellerPage from './SellerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
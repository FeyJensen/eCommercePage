import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './BuyerPage';
import SellerPage from './SellerPage';
import CartPage from './CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
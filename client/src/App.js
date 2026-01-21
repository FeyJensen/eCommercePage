import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './BuyerPage';
import SellerPage from './SellerPage';
import CartPage from './CartPage';
import AboutPage from './AboutPage';

//npm run devStart(server)
//npm start(client)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/aboutpage" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">amazon</Link>
        </header>
        <main>
          <Routes>
            <Route path="/products/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

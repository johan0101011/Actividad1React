import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import AppRoutes from './routes';
import { CartProvider } from './features/cart/hooks/cartContext';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('pinturas');

  return (
    <CartProvider>
      <div className="app-container">
        <Router>
          <Header activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="app-content">
            <AppRoutes activeSection={activeSection} setActiveSection={setActiveSection} />
          </main>
          <Footer />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;


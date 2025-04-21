import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CartOverlay, { CartItem } from './components/CartOverlay';
import { usePlaceOrder } from './hooks/usePlaceOrder';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const AppContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isCartDisabled, setIsCartDisabled] = useState(false);
  const location = useLocation();
  const placeOrderMutation = usePlaceOrder();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    if (isCartOpen) {
      setCartOpen(false);
    }
  }, [location.pathname]);

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find(cartItem =>
      cartItem.id === item.id &&
      JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
    );

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem === existingItem 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity += delta;
    
    if (newCart[index].quantity < 1) {
      newCart.splice(index, 1);
    }
    
    setCartItems(newCart);
  };

  // Updated order placement handler
  const handlePlaceOrder = async (items: CartItem[]): Promise<boolean> => {
    const success = await placeOrderMutation(items);
    if (success) {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      setOrderSuccess(true);
      setIsCartDisabled(true);
      
      setTimeout(() => {
        setOrderSuccess(false);
        setIsCartDisabled(false);
      }, 3000);
    }
    return success;
  };

  const toggleCart = () => {
    if (!isCartDisabled) {
      setCartOpen(!isCartOpen);
    }
  };

  const openCartOverlay = () => {
    if (!isCartDisabled) {
      setCartOpen(true);
    }
  };
  
  const activeCategory = location.pathname.split('/')[1] || 'all';

  return (
    <>
      {/* Global Order Success Box */}
      {orderSuccess && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center py-3 px-6 rounded shadow-lg z-[1000]">
          Order Placed Successfully!
        </div>
      )}

      <Header
        toggleCart={toggleCart}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        activeCategory={activeCategory}
        isCartDisabled={isCartDisabled}
      />

      <CartOverlay
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        increaseQuantity={index => updateQuantity(index, 1)}
        decreaseQuantity={index => updateQuantity(index, -1)}
        placeOrder={handlePlaceOrder}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              key="all" 
              activeCategory="all" 
              addToCart={addToCart} 
              openCartOverlay={openCartOverlay}
            />
          } 
        />
        <Route 
          path="/:category" 
          element={
            <ProductList 
              key={activeCategory} 
              activeCategory={activeCategory} 
              addToCart={addToCart} 
              openCartOverlay={openCartOverlay}
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetails 
              addToCart={addToCart} 
              openCartOverlay={openCartOverlay}
            />
          } 
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Router>
      <AppContent />
    </Router>
  </ApolloProvider>
);

export default App;
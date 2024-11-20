import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProductDetails } from './pages/ProductDetails';
import { ExpiredLink } from './pages/ExpiredLink';
import { ProductView } from './pages/ProductView';
import { useAuthStore } from './stores/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />} />
          <Route path="/view/:id" element={<ProductView />} />
          <Route path="/expired" element={<ExpiredLink />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
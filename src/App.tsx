import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Environment variables for configuration
const CACHE_STALE_TIME = parseInt(import.meta.env.VITE_CACHE_STALE_TIME || '5', 10) * 60 * 1000; // Convert minutes to ms
const CACHE_GC_TIME = parseInt(import.meta.env.VITE_CACHE_TIME || '30', 10) * 60 * 1000; // Convert minutes to ms
const API_RETRY_COUNT = parseInt(import.meta.env.VITE_API_RETRY_COUNT || '3', 10);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: API_RETRY_COUNT,
      staleTime: CACHE_STALE_TIME,
      gcTime: CACHE_GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<HomePage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App

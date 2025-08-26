import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Navbar from './components/layout/Navbar';
import Preloader from './components/ui/Preloader';

// Lazy load pages
const HomePage = lazy(() => import('./pages/home/HomePage'));
const CreateWorkspacePage = lazy(() => import('./pages/create/CreateWorkspacePage'));
const ChatPage = lazy(() => import('./pages/chat/ChatPage'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route 
                path="/chat/:workspaceId" 
                element={
                  <Suspense fallback={<Preloader message="Loading chat..." />}>
                    <ChatPage />
                  </Suspense>
                } 
              />
              <Route 
                path="*" 
                element={
                  <>
                    <Navbar />
                    <Suspense fallback={<Preloader message="Loading..." />}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreateWorkspacePage />} />
                        <Route path="/edit/:id" element={<CreateWorkspacePage />} />
                      </Routes>
                    </Suspense>
                  </>
                } 
              />
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
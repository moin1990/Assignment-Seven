import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimelineProvider } from './context/TimelineContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import FriendDetails from './pages/FriendDetails';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <TimelineProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-[#f0f5f2]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/"            element={<Home />} />
                <Route path="/friend/:id"  element={<FriendDetails />} />
                <Route path="/timeline"    element={<Timeline />} />
                <Route path="/stats"       element={<Stats />} />
                <Route path="*"            element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </ToastProvider>
      </TimelineProvider>
    </BrowserRouter>
  );
}

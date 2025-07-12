import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import UploadQuiz from './pages/UploadQuiz';
import Simulate from './pages/Simulate';
import Results from './pages/Results';
import AddProject from './pages/AddProject'; // ✅ Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/upload" element={<UploadQuiz />} />
        <Route path="/simulate" element={<Simulate />} />
        <Route path="/results" element={<Results />} />
        <Route path="/add-project" element={<AddProject />} /> {/* ✅ New route */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 – Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

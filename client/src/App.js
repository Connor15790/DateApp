import './App.css';
import TextState from './context/TextState';
import Home from './pages/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <TextState>
      <Router>
        <Routes>
          <Route exact path='/:id' element={<Home />} />
          <Route exact path='/' element={<Home defaultId="66dff4d9d0413e66db776763" />} />
        </Routes>
      </Router>
    </TextState>
  );
}

export default App;

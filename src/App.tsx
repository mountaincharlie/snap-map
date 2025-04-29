import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import MapView from './pages/MapView/MapView';


function App() {

  return (
    <HashRouter>
      <AppProvider>
        <div className="content">
          <Routes>
            <Route path="/" element={<MapView />} />
          </Routes>
        </div>
      </AppProvider>
    </HashRouter>
  );
};

export default App;

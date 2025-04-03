import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const Root = lazy(() => import('./routes/Root'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
}

export default App;

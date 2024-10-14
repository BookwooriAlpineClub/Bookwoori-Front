import { Routes, Route } from 'react-router-dom';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default Routing;

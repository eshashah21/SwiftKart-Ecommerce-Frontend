// npm run start

import './App.css';
import { Routes, Route } from 'react-router-dom'
import CustomerRouters from './Routers/CustomerRouters';
import AdminRouters from './Routers/AdminRouters';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/*' element={<CustomerRouters />} />
        <Route path='/admin/*' element={<AdminRouters />} />
      </Routes>
    </div>
  );
}

export default App;

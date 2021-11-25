import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import LoginAdmin from './admin/pages/Login';
import LoginUser from './user/pages/Login';
import SoalAdmin from './admin/pages/Soal';
const App = () => {
  return (
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/admin/login' element={<LoginAdmin />} />
            <Route exact path='/user/login' element={<LoginUser />} />
            <Route exact path='/admin/soal' element={<SoalAdmin />} />
            <Route exact path='/user/soal' element={<SoalAdmin />} />
          </Routes>
        </Fragment>
      </Router>
  );
};

export default App;

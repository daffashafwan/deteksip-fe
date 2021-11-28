import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from './admin/pages/Login';
import LoginUser from './user/pages/Login';
import SoalAdmin from './admin/pages/Soal';
import QuizUser from './user/pages/Quiz';
import { ApolloProvider } from "@apollo/client";
import { client } from './config.js';

const App = () => {
  return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Routes>
              <Route exact path='/admin/login' element={<LoginAdmin />} />
              <Route exact path='/user/login' element={<LoginUser />} />
              <Route exact path='/admin/soal' element={<SoalAdmin />} />
              <Route exact path='/user/quiz' element={<QuizUser />} />
            </Routes>
          </Fragment>
        </Router>
      </ApolloProvider>
  );
};

export default App;

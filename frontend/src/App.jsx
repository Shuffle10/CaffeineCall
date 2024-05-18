import React, { useState } from 'react';
import Form from './components/Form';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Instructions from './components/Instructions';
import Developers from './components/Developers';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index path='' element={<Home/>}></Route>
      <Route path='/developers' element={<Developers/>}></Route>
      <Route path='/instructions' element={<Instructions/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
  );
};



export default App

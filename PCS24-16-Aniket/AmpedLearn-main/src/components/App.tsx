import Header from "components/Header";
import LangList from "components/LangList";
import Metric from "components/Metric";
import Plot from "components/Plot";
import { useGlobal } from "context";
import { clx } from "helpers";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userpredict from "./Userpredict";
import About from "./About";
import Contact from "./Contact";
import Userpredictdb from "./Userpredictdb";
import axios from "axios";
import Blog from "./Blog"
import Predict from "./Predict";
import Predict_quaterly from "./Predict_quaterly";
import Videos from "./Videos";

const App = () => {
  const global = useGlobal();

  const [loading, setLoading] = useState(true);
  
  useEffect(function () {
    setTimeout(function () {
      setLoading(false)
    }, 4500)
  }, [])

  return (
    <div className='bg-gradient-to-r from-emerald-500 from-25% via-sky-500 via-65% to-indigo-500 to-80% ...'>
    {loading === true ? <Loader /> :
        <>
        <Router>
        <Header />
              <Routes>
                <Route path="/languish"  element={<Home />} />
                <Route path="/"  element={<Home />} />
                <Route path="/About" element={<About/>} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Userpredict" element={<Userpredict />} />
                <Route path="/Userpredictdb" element={<Userpredictdb />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/Predict" element={<Predict />} />
                <Route path="/Predict_quaterly" element={<Predict_quaterly />} />
                <Route path="/Videos" element={<Videos />} />
              </Routes>
            </Router>
        </>
      }
    </div>
  );
};

export default App;

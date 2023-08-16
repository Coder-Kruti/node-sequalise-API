import React  from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Contact from "../pages/Contact";

function MyRouter(){
        return(
            <Routes>
                <Route path ="/" element = {<Home />} />
                <Route path ="/about" element = {<AboutUs />} />
                <Route path ="/contact" element = {<Contact />} />
            </Routes>

        ) 
}
export default MyRouter;
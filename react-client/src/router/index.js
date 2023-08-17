import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Contact from "../pages/Contact";
import HouseList from '../pages/House.js'
import HouseCreate from '../pages/HouseCreate.js'
import HouseEdit from '../pages/HouseEdit.js'

function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/houses" element={<HouseList />} />
            <Route path="/houses/create" element={<HouseCreate />} />
            <Route path="houses/:id/edit" element={<HouseEdit />} />
            
        </Routes>

    )
}
export default MyRouter;
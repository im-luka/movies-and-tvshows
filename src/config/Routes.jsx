import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Switch>
  );
};

export default Routes;

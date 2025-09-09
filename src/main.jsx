import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import TopNews from "./pages/TopNews.jsx";
import WorldNews from "./pages/WorldNews.jsx";
import Business from "./pages/Business.jsx";
import Technology from "./pages/Technology.jsx";
import Health from "./pages/Health.jsx";
import Sports from "./pages/Sports.jsx";
import Science from "./pages/Science.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Entertainment from "./pages/Entertainment.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/topnews" element={<TopNews />} />
      <Route path="/worldnews" element={<WorldNews />} />
      <Route path="/business" element={<Business />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/health" element={<Health />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/science" element={<Science />} />
      <Route path="/entertainment" element={<Entertainment />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import { store } from "./redux/store.js";
import EditorWindow from "./pages/EditorWindow.jsx";
import Create from "./pages/Create.jsx";
import MyDisk from "./pages/MyDisk.jsx";
import Saved from "./pages/Saved.jsx";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PrivateRoutes />}>
        <Route path="" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/disks" element={<MyDisk />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/disk/:documentId" element={<EditorWindow />} />
        <Route path="/search/:diskTitleSlug" element={<Search />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

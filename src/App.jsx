import "./App.css";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
import Registration from "./components/Registration";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/RootLayout";
import AddProduct from "./components/AddProduct";
import ThankYou from "./components/ThankYou";
import Orders from "./components/Orders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

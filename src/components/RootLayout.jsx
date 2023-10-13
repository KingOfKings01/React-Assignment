// eslint-disable-next-line no-unused-vars
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store from "../store/store";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>

        <NavBar className="mb-2" />


        <main className="main-wrapper container">
          <Outlet />
        </main>

        <footer className="blockquote-footer bg-dark text-light pb-2 mt-2 text-center">
          <p>Developed with &#9829; by Asif Khan</p>
          <p>
            &copy; {new Date().getFullYear()} Asif Khan. All Rights Reserved.
          </p>
        </footer>
      </Provider>
    </>
  );
}

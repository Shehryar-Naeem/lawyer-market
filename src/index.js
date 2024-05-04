import React from "react";
import ReactDOM from "react-dom/client";
import "flowbite-react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PrimeReactProvider } from "primereact/api";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket/socket";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <SkeletonTheme baseColor="#AEAEAE" highlightColor="#D9D9D9">
      <PrimeReactProvider>
        <Provider store={store}>
          <Toaster position="top-right" />
          <SocketProvider>
            <App />
          </SocketProvider>
        </Provider>
      </PrimeReactProvider>
    </SkeletonTheme>
  </>
);

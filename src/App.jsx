import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./utils/store/store";

import Footer from "./components/Footer";
import Success from "./pages/Success";
import Login from "./pages/Loginn";
import { ThemeProvider } from "./utils/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Offers from "./pages/Offers";


const AboutME = lazy(() => import("./components/AboutMe"));

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <div className="app min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
                      <Footer />
          </div>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/aboutme",
        element: (
          <Suspense>
            <AboutME />
          </Suspense>
        )
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      },
    ],
    errorElement: <Error />
  },
])



export default App

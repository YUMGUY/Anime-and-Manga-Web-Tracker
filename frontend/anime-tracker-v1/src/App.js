import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'; 
import ViewerStats from './pages/ViewerStats';
import Search from './pages/Search';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/viewer-stats",
      element: <ViewerStats />,
    },
    {
      path: "/search",
      element: <Search />,
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;

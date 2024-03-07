import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'; 
import ViewerStats from './pages/ViewerStats';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/viewer-stats",
      element: <ViewerStats />,
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;

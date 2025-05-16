import "./App.scss";

import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbar />
      <MovieList />
      <Outlet />
    </div>
  );
}

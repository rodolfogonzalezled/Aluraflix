import Home from "pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
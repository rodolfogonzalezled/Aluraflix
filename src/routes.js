import Home from "pages/Home";
import NewVideo from "pages/NewVideo";
import PageBase from "pages/PageBase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route index element={<Home />}></Route>
                    <Route path="new-video" element={<NewVideo />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
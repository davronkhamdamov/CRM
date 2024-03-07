import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Bemorlar from "../pages/Bemorlar";
import Admin from "../pages/Admin";
import Payment from "../pages/Payment";
import Statistic from "../pages/Statistic";
import Reception from "../pages/Reception";
import Doctors from "../pages/Doctors";
import Login from "../pages/Login";
import Book from "./../pages/Book";

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/admin" element={<RootLayout />}>
                <Route index element={<Admin />} />
            </Route>
            <Route path="/payment" element={<RootLayout />}>
                <Route index element={<Payment />} />
            </Route>
            <Route path="/reception" element={<RootLayout />}>
                <Route index element={<Reception />} />
            </Route>
            <Route path="/statistic" element={<RootLayout />}>
                <Route index element={<Statistic />} />
            </Route>
            <Route path="/patient" element={<RootLayout />}>
                <Route index element={<Bemorlar />} />
            </Route>
            <Route path="/doctors" element={<RootLayout />}>
                <Route index element={<Doctors />} />
            </Route>
            <Route path="/auth">
                <Route index element={<Login />} />
            </Route>
            <Route path="/book" element={<Book />} />
        </>
    )
);

export default route;

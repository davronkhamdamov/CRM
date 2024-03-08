import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Bemorlar from "../pages/Bemorlar";
import Payment from "../pages/Payment";
import Statistic from "../pages/Statistic";
import Reception from "../pages/Reception";
import Doctors from "../pages/Doctors";
import Login from "../pages/Login";
import Book from "./../pages/Book";
import SingleBemor from "../pages/SingleBemor";

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/admin" element={<RootLayout />}>
                <Route path="payment" element={<Payment />} />
                <Route index path="statistic" element={<Statistic />} />
                <Route path="patient" element={<Bemorlar />} />
                <Route path="patient/:id" element={<SingleBemor />} />
                <Route path="doctors" element={<Doctors />} />
            </Route>
            <Route path="/reception" element={<Reception />}>
                <Route path="payment" element={<Payment />} />
                <Route path="statistic" element={<Statistic />} />
                <Route path="patient" element={<Bemorlar />} />
                <Route path="patient/:id" element={<SingleBemor />} />
            </Route>

            <Route path="/auth">
                <Route index element={<Login />} />
            </Route>
            <Route path="/book" element={<Book />} />
        </>
    )
);

export default route;

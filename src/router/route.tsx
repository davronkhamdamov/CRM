import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Bemorlar from "../pages/Bemorlar";
import Payment from "../pages/Payment";
import Statistic from "../pages/Statistic";
import Reception from "../layout/Reception";
import Doctors from "../pages/Doctors";
import Login from "../pages/Login";
import Book from "./../pages/Book";
import SingleBemor from "../pages/SingleBemor";
import SingleDocktor from "../pages/SingleDoctor";
import Treatment from "./../pages/Treatment1";
import PaymentTypes from "../pages/PaymentTypes";
import Services from "../pages/Services";
import Settings from "../pages/Settings";
import Hisobot from "../pages/Hisobot";
import DockerLayout from "../layout/DoctorLayout";
import ForgetPassword from "../pages/ForgetPassword";
import NotFoundPage from "../pages/NotFoundPage";

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/admin" element={<RootLayout />}>
                <Route index path="statistic" element={<Statistic />} />
                <Route path="payment" element={<Payment />} />
                <Route path="patient" element={<Bemorlar />} />
                <Route path="patient/:id" element={<SingleBemor />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:id" element={<SingleDocktor />} />
                <Route path="payment-type" element={<PaymentTypes />} />
                <Route path="services" element={<Services />} />
                <Route path="treatment" element={<Treatment />} />
                <Route path="settings" element={<Settings />} />
                <Route path="hisobot" element={<Hisobot />} />
            </Route>
            <Route path="doctor" element={<DockerLayout />}>
                <Route index path="statistic" element={<Statistic />} />
                <Route path="treatment" element={<Treatment />} />
            </Route>
            <Route path="/reception" element={<Reception />}>
                <Route index path="statistic" element={<Statistic />} />
                <Route path="payment" element={<Payment />} />
                <Route path="patient" element={<Bemorlar />} />
                <Route path="patient/:id" element={<SingleBemor />} />
                <Route path="treatment" element={<Treatment />} />
            </Route>

            <Route path="/auth">
                <Route index element={<Login />} />
                <Route path="forget-password" element={<ForgetPassword />} />
            </Route>
            <Route path="/book" element={<Book />} />
            <Route path="*" element={<NotFoundPage />} />
        </>
    )
);

export default route;

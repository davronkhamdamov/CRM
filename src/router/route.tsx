import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Bemorlar from "../pages/Bemorlar";
import Payment from "../pages/Payment";
import UserPayment from "../pages/UserPayment";
import Statistic from "../pages/Statistic";
import Reception from "../layout/Reception";
import Doctors from "../pages/Doctors";
import Login from "../pages/Login";
import Register from "../pages/Register.tsx";
import Book from "./../pages/Book";
import SingleBemor from "../pages/SingleBemor";
import SingleDocktor from "../pages/SingleDoctor";
import Treatment from "../pages/Treatment";
import UserTreatment from "../pages/UserTreatment";
import DebtTreatment from "../pages/DebtTreatment";
import OrtoTreatment from "../pages/OrtoTreatment";
import OrtoDoctorTreatment from "../pages/OrtoDoctorTreatment.tsx";
import PaymentTypes from "../pages/PaymentTypes";
import Services from "../pages/Services";
import Settings from "../pages/Settings";
import Hisobot from "../pages/Hisobot";
import DockerLayout from "../layout/DoctorLayout";
import NotFoundPage from "../pages/NotFoundPage";
import DocktorTreatment from "../pages/DocktorTreatment";
import SingleDocktorTreatment from "../pages/SingleDocktorTreatment";
import ServiceCategory from "../pages/ServiceCategory";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import Calendar from "../pages/Calendar";
import UserCalendar from "../pages/UserCalendar";
import UserLayout from "../layout/UserLayout";
import SingleDocktorTreatmentOrta from "../pages/SingleDocktorTreatmentOrta";

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
        <Route path="service-category" element={<ServiceCategory />} />
        <Route path="treatment" element={<Treatment />} />
        <Route path="debt-treatment" element={<DebtTreatment />} />
        <Route path="orto-treatment" element={<OrtoTreatment />} />
        <Route path="settings" element={<Settings />} />
        <Route path="hisobot" element={<Hisobot />} />
        <Route path="schedule" element={<Calendar />} />
        <Route path="schedule/:id" element={<Calendar />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/doctor" element={<DockerLayout />}>
        <Route index path="statistic" element={<Statistic />} />
        <Route path="treatment" element={<DocktorTreatment />} />
        <Route path="treatment/:id" element={<SingleDocktorTreatment />} />
        <Route path="hisobot" element={<Hisobot />} />
        <Route path="schedule" element={<Calendar />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orta-treatment" element={<OrtoDoctorTreatment />} />
        <Route
          path="orta-treatment/:id"
          element={<SingleDocktorTreatmentOrta />}
        />
      </Route>
      <Route path="/reception" element={<Reception />}>
        <Route index path="statistic" element={<Statistic />} />
        <Route path="payment" element={<Payment />} />
        <Route path="patient" element={<Bemorlar />} />
        <Route path="patient/:id" element={<SingleBemor />} />
        <Route path="treatment" element={<Treatment />} />
        <Route path="schedule" element={<Calendar />} />
        <Route path="schedule/:id" element={<Calendar />} />
        <Route path="profile" element={<Profile />} />
        <Route path="hisobot" element={<Hisobot />} />
      </Route>
      <Route path="/dashboard" element={<UserLayout />}>
        <Route path="payment" element={<UserPayment />} />
        <Route path="treatment" element={<UserTreatment />} />
        <Route path="schedule" element={<UserCalendar />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/auth">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
      <Route path="/book" element={<Book />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default route;

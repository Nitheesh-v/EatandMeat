import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import DeliveryModal from "../components/Delivery/DeliveryModal";

const MainLayout = () => {
    return (
        <>
        {/* <DeliveryModal/> */}
            <Navbar />

            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;
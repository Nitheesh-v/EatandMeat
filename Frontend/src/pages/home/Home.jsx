
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import ProductsSection from "../../components/ProductsSection";
import Offers from "../../components/Offer";
import WhyChooseUs from "../../components/WhyChooseUs";
import DeliveryAreas from "../../components/DeliveryAreas";
import WomenEmpowerment from "../../components/WomenEmpowerment";


function Home(){

    return(
        <>
           

            <Hero />

                    <WhyChooseUs />

            <Categories />



            <ProductsSection />

           <Offers />

    <WomenEmpowerment/>

            <DeliveryAreas />

           
        </>
    )
}

export default Home;
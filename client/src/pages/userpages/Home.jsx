import Herosection from "../../components/usercomponents/herosection";
import Browsebytype from "../../components/usercomponents/browsebytype";
import CarTabs from "../../components/usercomponents/cardatatabs";
import Livecar from "../../components/usercomponents/Live car";
import Loader from "../../components/usercomponents/loader";
import RecentlyAdded from "../../components/usercomponents/paginations";
import CarSection from "../../components/usercomponents/car";
import Feature from "../../components/usercomponents/feature";
import Premium from "../../components/usercomponents/premium";
import Reachus from "../../components/usercomponents/reachus";
import Footer from "../../components/usercomponents/footer";

const Home = () => {

  return (

        <>
          <Herosection />
          <Browsebytype />
          <CarTabs />
          <Livecar />
          <Loader />
          <RecentlyAdded />
          <CarSection />
          <Feature />
          <Premium />
          <Reachus />
          <Footer />
        </>
  );
};

export default Home;


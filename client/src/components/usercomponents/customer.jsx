// import React from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import Slider from "../usercomponents/slider";
// import img1 from "../../assets/images/men.png";
// const Customer = () => {
//   const Carddata = [
//     {
//       id: 1,
//       image: img1,
//       text: "Leslie Alexander",
//       texts:
//         " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
//     },
//     {
//       id: 2,
//       image: img1,
//       text: "Leslie Alexander",
//       texts:
//         " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
//     },
//     {
//       id: 3,
//       image: img1,
//       text: "Leslie Alexander",
//       texts:
//         " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
//     },
//   ];
//   return (
//     <div className="customer-section">
//       <div className="customer-txt">
//         <button>Customer</button>
//         <h1>Our Happy Customer</h1>
//       </div>
//       <div className="customer-slider">
//         <OwlCarousel
//           className="owl-theme"
//           loop
//           margin={10}
//           nav
//           autoplay
//           autoplayTimeout={3000}
//           responsive={{
//             0: { items: 1 },
//             600: { items: 2 },
//             1000: { items: 3 },
//           }}
//         >
//           {Carddata.map((card, index) => (
//             <Slider
//               key={index}
//               image={card.image}
//               text={card.text}
//               texts={card.texts}
//             />
//           ))}
//         </OwlCarousel>
//       </div>
//     </div>
//   );
// };

// export default Customer;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "../../assets/stylesheets/aboutus.scss";
import Slider from "../usercomponents/slider";
// import "swiper/swiper.min.css";
import img1 from "../../assets/images/men.png";

const Customer = () => {
  const Carddata = [
    {
      id: 1,
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 2,
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 3,
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
  ];

  return (
    <div className="customer-section">
      <div className="customer-txt">
        <button>Customer</button>
        <h1>Our Happy Customer</h1>
      </div>
      <div className="customer-slider">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            600: { slidesPerView: 2 },
            1000: { slidesPerView: 3 },
          }}
          loop
        >
          {Carddata.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="slider-card">
                <img src={card.image} alt={card.text} />
                <h3>{card.text}</h3>
                <p>{card.texts}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Customer;

import React from "react";
import "../../assets/stylesheets/FeatureCategory.scss";
import { Link } from "react-router-dom";
const Termsandcondition = () => {
  return (
    <>
      <div style={{ paddingBottom: 40, backgroundColor: "#050b20" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="about-section2-detail">
            <div className="Breadcrumb-section">
              <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Terms & condition
                  </li>
                </ol>
              </nav>
            </div>
            <h1 className="mb-4">Terms & condition</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Convallis integer enim
              eget sit urna. Eu duis lectus amet vestibulum varius. Nibh tellus
              sit sit at lorem facilisis. Nunc vulputate ac interdum aliquet
              vestibulum in tellus.
            </p>
            <p>
              Sit convallis rhoncus dolor purus amet orci urna. Lobortis
              vulputate vestibulum consectetur donec ipsum egestas velit laoreet
              justo. Eu dignissim egestas egestas ipsum. Sit est nunc
              pellentesque at a aliquam ultrices consequat. Velit duis velit nec
              amet eget eu morbi. Libero non diam sit viverra dignissim. Aliquam
              tincidunt in cursus euismod eni
            </p>
            <p>
              Magna odio sed ornare ultrices. Id lectus mi amet sit at sit arcu
              mi nisl. Mauris egestas arcu mauris.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Termsandcondition;

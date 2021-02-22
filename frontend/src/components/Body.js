import React, {Fragment}from 'react';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import { Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { Link } from 'react-router-dom';
// import Navbar from './screens/users/Navbar';
// import Navbar from './components/screens/users/Navbar';
import Header from '../components/Header'


const Body = (props) => {

  return (
    
    <Fragment>
      <Header />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-9 col-md-8 ml-auto fixed-sides">
              <div className="card card-common">
                <div className="card-body">
                <div className="col-xl-12 col-lg-9 col-md-8 ml-auto">
                <Carousel>
                <div
                  id="slides"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ul className="carousel-indicators">
                    <li
                      data-target="#slides"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li data-target="#slides" data-slide-to="1"></li>
                    <li data-target="#slides" data-slide-to="2"></li>
                  </ul>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="/images/chalk.jpg"
                        alt=""
                      />
                      <div class="carousel-caption">
            
            <h3>EMPLOYEE APPRAISAL</h3>
            <button type="button" class="btn btn-outline-light btn-lg">
            <Link to='/login'  >
                    Employee Login
                  </Link>
            </button>
            <button type="button" class="btn btn-primary btn-lg">
            <Link to='/adminlogin' className='dropdown-item'>
                    Manager Login
                  </Link>
            </button>
          </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/background.jpg"
                        alt=""
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/background3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Carousel>
          </div>


          
          <div className="container-fluid">
            <div className="row jumbotron">
              <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                <p className="lead">
                  Employee appraisal will help you to get your feedbacks and promotions.
                  Call-07274660218 for queries.
                </p>
              </div>
              
            </div>
          </div>


        
          <div className="container-fluid padding">
            <div className="row text-center padding">
              <div className="col-12">
                <h2>Connect</h2>
              </div>
              <Router>
              <div className="col-12 social padding">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              </Router>
            </div>
          </div>


          
          <footer>
            <div className="container-fluid padding">
              <div className="row text-center">
                <div className="col-md-4">
                
                  <hr className="light" />
                  <p>072-746-0218</p>
                  <p>kado@mba.com</p>
                  <p>300 Street Name</p>
                  <p>Garissa County,007</p>
                </div>
                <div className="col-md-4">
                  <hr className="light" />
                  <h5>Our Hours</h5>
                  <hr className="light" />
                  <p>Monday: 8am - 4pm</p>
                  <p>Thursday: 10am - 3pm</p>
                  <p>Friday: closed</p>
                </div>
                <div className="col-md-4">
                  <hr className="light" />
                  <h5>Service Area</h5>
                  <hr className="light" />
                  <p>Garissa, County, 0007</p>
                  <p>City, County, 0000</p>
                  <p>City, County, 0000</p>
                  <p>City, County, 0000</p>
                </div>
                <div className="col-12">
                  <hr className="light-100" />
                  <h5>&copy; khadarow.com</h5>
                </div>
              </div>
            </div>
          </footer>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Body;

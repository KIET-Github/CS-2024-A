import Head from "../components/head.jsx";
import Link from "next/link";
import { Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar.jsx";
import Footer from "../components/Footer.jsx";
import Image from "../public/slider-2.jpg";
import { useRouter } from 'next/router'
export default function Home() {

  const router = useRouter()
  const handleBookDriverClick = () => {


    router.push('/driver-list')
  }
  return (
    <>
      <NavigationBar />
      <section className="hero">
        <div className="hero-section position-relative">
          <div className="heading-box w-50">
            <div class="col-md-6 col-lg-5 col-xl-4">
              <h1>Hire a driver cheaply</h1>
              <p>
                Hire a driver at a low price and get the next rental with
                a 25% discount!
              </p>
              <Button variant='primary' onClick={handleBookDriverClick}>
                Book now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-xl bg-white py-5">
        <div class="container">
          <div class="row row-40 justify-content-md-between">
            <div class="col-md-5">
              <img src="../advantages.jpg" alt="" width="460" height="614" />
            </div>
            <div class="col-md-6">
              <h2>Our advantages</h2>
              <p>Hiring driver on Hi-Drive offers lots of advantages.</p>
              <p>
                Hiring a driver from us provides an unforgettable and
                positive experience. With our services, you’ll also get:
              </p>
              <article class="blurb blurb-circle ms-0">
                <div class="unit unit-spacing-xl">
                  <div class="unit-left">
                    <div class="blurb-circle__icon">
                      <span class="icon fa-check"></span>
                    </div>
                  </div>
                  <div class="unit-body">
                    <h3 class="heading-4 blurb__title">
                      Mobile phone reservation
                    </h3>
                    <p class="small text-secondary text-width-3">
                      Book your driver in advance with mobile phone
                      reservation services or by using our web-app.
                    </p>
                  </div>
                </div>
              </article>
              <article class="blurb blurb-circle ms-0">
                <div class="unit unit-spacing-xl">
                  <div class="unit-left">
                    <div class="blurb-circle__icon">
                      <span class="icon fa-check"></span>
                    </div>
                  </div>
                  <div class="unit-body">
                    <h3 class="heading-4 blurb__title">One-way trip reservation</h3>
                    <p class="small text-secondary text-width-3">
                      Hi-Drive offers easy and convenient one-way driver hiring
                      between many of its locations.
                    </p>
                  </div>
                </div>
              </article>
              <article class="blurb blurb-circle ms-0">
                <div class="unit unit-spacing-xl">
                  <div class="unit-left">
                    <div class="blurb-circle__icon">
                      <span class="icon fa-check"></span>
                    </div>
                  </div>
                  <div class="unit-body">
                    <h3 class="heading-4 blurb__title">Round trip reservation</h3>
                    <p class="small text-secondary text-width-3">
                    Hi-Drive offers easy and convenient roundtrip driver hiring from a specific locationa.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-xl bg-light py-5">
        <div class="container">
          <div class="row row-40 justify-content-md-between flex-column-reverse flex-md-row">
            <div class="col-md-5">
              <h2>Quality guaranteed</h2>
              <p>Hidrive provides quality Driver hiring solutions.</p>
              <p>
                When it comes to hiring a driver, the options can be overwhelming
                and hard to sift through. Rest assured that whatever you’re
                looking for, we can provide it.
              </p>
              <p>
                From top-notch customer service to a vast selection of drivers, you can expect the best from our team.
              </p>
              <a class="button button-primary" href="about.html">
              
              </a>
            </div>
            <div class="col-md-6">
              <img src="../display.jpg" alt="" width="560" height="418" />
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}

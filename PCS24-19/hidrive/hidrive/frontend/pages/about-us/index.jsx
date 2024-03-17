import Footer from "../../components/Footer"
import { Container } from 'react-bootstrap'
import NavigationBar from "../../components/NavigationBar"

const AboutUs = () => {
    return <> <NavigationBar />

        <Container>


            <div className="about-section mb-5">
                <h1>About Us</h1>
                <p>In our new system, you can easily book a driver from the comfort of your home by entering some information in an
                    online web application. Once you start your journey with the driver, when it's over, you can pay conveniently with
                    cash, card, or net banking. Our system does more than that too. It keeps an eye on where the car is and how fast
                    it's going. It also keeps a record of all the drivers and listens to what customers say about their rides. It even
                    offers special deals to drivers and customers based on certain conditions. Our system mainly focuses on two
                    things: booking a driver and making sure our customers are safe. We keep your details and order information so we
                    can keep track of everything. We have set rules that help us do things automatically, which reduces the need for
                    manual work and calculations.</p>
                <p></p>
            </div>

            <h2 className="text-center mb-2">Our Team</h2>
            <div className="row">
                <div className="col mb-2">
                    <div className="card">

                        <div className="container cstm-form">
                            <h2>Anmol Patel</h2>
                            <p className="title">Developer</p>

                            <p>anmoldau@gmail.com</p>

                        </div>
                    </div>
                </div>

                <div className="col  mb-2">
                    <div className="card">

                        <div className="container cstm-form">
                            <h2>Aman Verma</h2>
                            <p className="title">Developer</p>

                            <p>amanverma1351@gmail.com</p>

                        </div>
                    </div>
                </div>

                <div className="col  mb-5">
                    <div className="card cstm-form">

                        <div className="container">
                            <h2>Akshat Singh</h2>
                            <p className="title">Developer</p>

                            <p>akshatsingh1331@gmail.com</p>

                        </div>
                    </div>
                </div>
            </div>
        </Container>
        <Footer /></>
}

export default AboutUs
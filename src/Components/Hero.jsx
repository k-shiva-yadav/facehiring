import { Button, Col, Container, Row } from "react-bootstrap";
import frame from '../Assests/Images/HeroImg.png';
import '../Assests/Css/Hero.css';
import google from '../Assests/Images/google.png';
import fb from '../Assests/Images/Facebook.svg.png';
import microsoft from '../Assests/Images/Microsoft.png';

function Hero() {
    return ( 
        <>
            <Container fluid className="p-5">
                <Row>
                    <Col md={6}>
                        <img src={frame} alt="circle" className="img-fluid" width="80%" />
                    </Col>
                    <Col md={6}>
                        <h2 className="hero-heading">Welcome to 
                            <img 
    src="/images/FACEHIRE-LOGO-DARK.png" 
    alt="Facehiring Logo" 
    style={{ height: "60px", objectFit: "contain", paddingLeft: "10px" }} 
  />
                        </h2>
                        <p className="hero-text">Facehiring helps you connect with similar kind of <span className="text-span">Skills Sets People</span> and <span className="text-span">Employers</span> across the world</p>
                        <div className="hero-btn py-5">
                            <Button href="/register" className="hero-btn-item btn">Register Now</Button>
                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <hr className="hr-line" />
                                </div>
                                <div>
                                    <p className="continue-text m-0 px-2">Or continue with</p>
                                </div>
                                <div>
                                    <hr className="hr-line" />
                                </div>
                            </div>
                            <div className="d-inline-grid gap-3">
                                <Button href="/" className="btn-item btn"><span><img src={google} alt="google"></img></span>Continue with Google</Button>
                                <Button href="/" className="btn-item btn"><span><img src={microsoft} alt="microsoft"></img></span>Continue with Microsoft</Button>
                                <Button href="/" className="btn-item btn"><span><img src={fb} alt="facebook"></img></span>Continue with Facebook</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default Hero;
import headinglogo from '../Assests/Images/howitworks.png';
import step1 from '../Assests/Images/step1.png';
import step2 from '../Assests/Images/step2.png';
import step3 from '../Assests/Images/step3.png';
import step4 from '../Assests/Images/step4.png';
import arrow from '../Assests/Images/Arrow 1.png';
import '../Assests/Css/HowItWorks.css';
import { Col, Container, Row } from 'react-bootstrap';

function HowItWorks() {
    return ( 
        <Container>
            <img src={headinglogo} alt="HowItWorks"></img>
            {/* Step 1 */}
            <Row className="step">
                <Col md={4} className="step-image">
                    <img src={step1} alt="Step1" className='p-5'></img>
                </Col>
                <Col md={8} className='d-flex align-items-center'>
                    <div className="step-number">1</div>
                    <div>
                        <p className='step-text m-0'>STEP : 1</p>
                        <p className='step-heading m-0'>Create profiles</p>
                        <p className='step-content m-0'>Users create a profile that showcases their career history, skills, and 
                        experience, acting as a digital resume. </p>
                    </div>
                </Col>                
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                {/* <i className='fa fa-arrow'></i> */}
                <img src={arrow} alt="Step1" className='p-5'></img>
                </Col>            
                <Col md={4}></Col>    
            </Row>
            {/* Step 2 */}
            <Row className="step">                
                <Col md={8} className='d-flex align-items-center'>
                    <div className="step-number">2</div>
                    <div>
                        <p className='step-text m-0'>STEP : 2</p>
                        <p className='step-heading m-0'>Build network with similar kind of skills sets people</p>
                        <p className='step-content m-0'>Users can connect with other professionals by sending connection
                        requests, building a network of contacts.  </p>
                    </div>
                </Col>    
                <Col md={4} className="step-image">
                    <img src={step2} alt="Step2" className='img-fluid'></img>
                </Col>            
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                {/* <i className='fa fa-arrow'></i> */}
                <img src={arrow} alt="Step1" className='p-5'></img>
                </Col>            
                <Col md={4}></Col>    
            </Row>
            {/* Step 3 */}
            <Row className="step">
                <Col md={4} className="step-image">
                    <img src={step3} alt="Step3" className='p-5'></img>
                </Col>
                <Col md={8} className='d-flex align-items-center'>
                    <div className="step-number">3</div>
                    <div>
                        <p className='step-text m-0'>STEP : 3</p>
                        <p className='step-heading m-0'>Share content and Posts</p>
                        <p className='step-content m-0'>Users can share articles, posts, and updates related to their industry 
                        and career, engaging with their network.  </p>
                    </div>
                </Col>                
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                {/* <i className='fa fa-arrow'></i> */}
                <img src={arrow} alt="Step1" className='p-5'></img>
                </Col>            
                <Col md={4}></Col>    
            </Row>
            {/* Step 4 */}
            <Row className="step">                
                <Col md={8} className='d-flex align-items-top'>
                    <div className="step-number">4</div>
                    <div>
                        <p className='step-text m-0'>STEP : 4</p>
                        <p className='step-heading m-0'>Job Search and Opportunities</p>
                        <p className='step-content-heading m-0'> a) Job Listings:  </p>
                        <p className='step-content'>Facehiring features a job board where companies post open positions, 
                        allowing users to search for and apply for jobs.</p>
                        <p className='step-content-heading m-0'> b) Recruiter Outreach: </p>
                        <p className='step-content'>Recruiters and hiring managers use Facehiring to find and connect with 
                        potential candidates.</p>
                        <p className='step-content-heading m-0'> c) Company Pages:  </p>
                        <p className='step-content'>Companies can create pages to showcase their culture, values, and 
                        job openings, attracting talent. </p>
                    </div>
                </Col>    
                <Col md={4} className="step-image">
                    <img src={step4} alt="Step4" className='img-fluid'></img>
                </Col>            
            </Row>
        </Container>
     );
}

export default HowItWorks;
import Link from "next/link";
import { useState } from "react";
import { signupAPI } from "../../apiCalls/authAPIs";
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
const Signup = () => {
  const [signupModal, setSignupModal] = useState({
    email: "",
    password: "",
    name: '',
    mobile: '',
    address: ''
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupModal({
      ...signupModal,
      [name]: value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(signupModal).some(x => signupModal[x] == '')) {
      setError('All fields are required')
      return
    }
    setError("");
    setSuccess("");
    signupAPI(signupModal).then((res) => {
      if (res.status == "409")
        setError(
          "This email is already registered. Please try again with different email."
        );
      if (res.status == "201")
        setSuccess("Email registered successfully. Please login.");
    });
  };

  return (


    <div className="signup-page">
      <Container className='login'>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className='cstm-form'>

              <h2 className="text-center mb-4" >Signup Form</h2>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control name='name' value={signupModal.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control name='mobile' value={signupModal.mobile} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Address</Form.Label>
                  <Form.Control name='address' value={signupModal.address} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control name='email' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' onChange={handleInputChange} type='password'/>
                </Form.Group>
                {error && (
                  <div className="alert alert-danger">
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success">
                    <span>{success}</span>
                  </div>
                )}

                <Button variant="primary" className="w-100" onClick={handleSubmit}>Signup</Button>{' '}

                <Form.Label className="text-primary fw-bolder mt-2"> <span className="text-dark fw-normal">Are you a member?  </span> <Link href="/login">Login now</Link></Form.Label>



              </Form>
            </div>

          </Col>

        </Row>


      </Container>

    </div>


  );
};

export default Signup;

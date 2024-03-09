import Link from "next/link";
import { loginAPI } from "../../apiCalls/authAPIs";
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { setAuthLoggedinState } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import { useState } from "react";
import {setUserData} from '../../store/user'
const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loginModal, setLoginModal] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginModal({
      ...loginModal,
      [name]: value,
    });
    setError("");
    //  setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(loginModal).some(x => loginModal[x] == '')) {
      setError('All fields are required')
      return
  }
    setError("");
    //  setSuccess("");
    loginAPI(loginModal).then((res) => {
      if (res.status == "success") {
        dispatch(setAuthLoggedinState(true))
        dispatch(setUserData(res.data))
        router.push('/user-profile')
      }else{
        setError('username or password is incorrect')
      }
    });
  };

  return (

    <div className="login-page">
      <Container className='login'>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className='cstm-form'>
              <h2 className="text-center mb-4" >Login Form</h2>
              <Form>

                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control name='email' value={loginModal.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' value={loginModal.password} type='password' onChange={handleInputChange} />
                </Form.Group>
                {error && (
                  <div className="alert alert-danger">
                  <span>{error}</span>
                </div>
                )}



                <Button variant="primary" className="w-100" onClick={handleSubmit}>Login</Button>{' '}



                <Form.Label className="text-primary fw-bolder mt-2"> <span className="text-dark fw-normal">Not a member? </span>    <Link href="/signup">Signup now</Link></Form.Label>



              </Form>
            </div>

          </Col>

        </Row>


      </Container>

    </div>
  );
};
export default Login;

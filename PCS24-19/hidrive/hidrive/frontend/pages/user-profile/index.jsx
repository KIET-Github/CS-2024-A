import React from "react";
import Protected from "../../components/Protected.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import NavigationBar from "../../components/NavigationBar.jsx";
import Bookings from "../../components/Bookings.jsx";

const index = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <Protected>
      <Container className='mt-5'>
      <Row>
          <Col md={4}>
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="my-3">{userData?.name}</h5>
                <p className="text-muted mb-1">Car Owner</p>
                <p className="text-muted mb-4">{userData?.mobile}</p>
                {/* <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">
                    Follow
                  </button>
                  <button type="button" className="btn btn-outline-primary ms-1">
                    Message
                  </button>
                </div> */}
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="row">
              <div className="col-md-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-md-9">
                <p className="text-muted mb-0">{userData?.name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-md-9">
                <p className="text-muted mb-0">{userData?.email}</p>
              </div>
            </div>
            
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-md-9">
                <p className="text-muted mb-0">{userData?.mobile}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-md-9">
                <p className="text-muted mb-0">{userData?.address}</p>
              </div>
            </div>
            <hr/>
            <Bookings/>
          </Col>
        </Row>
      </Container>
    </Protected>
  );
};

export default index;

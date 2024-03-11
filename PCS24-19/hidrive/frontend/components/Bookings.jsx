import Accordion from 'react-bootstrap/Accordion';
import Link from "next/link";

import { useBookingList } from '../hooks/book';
import Spinner from 'react-bootstrap/Spinner';
import {Alert,Row,Form,Col} from 'react-bootstrap'


const Bookings = () => {
    const { bookingListApiStatus, bookingList, fetchBookingList } = useBookingList()
    return (
        <>
            <h6>Bookings</h6>
            {(bookingListApiStatus == "INIT") && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {bookingListApiStatus == "ERROR" && (
                <Alert variant='danger'>
                    Failed to fetch booking list. Please{" "}
                    <a onClick={fetchBookingList}>try again</a> later.
                </Alert>
            )}
            {
                (bookingListApiStatus == "SUCCESS") && <Accordion >
                    {
                        bookingList?.length == 0 ? <Alert key='dark' variant='dark'>
                            It seems you have not hired any driver yet. <Link href='/driver-list' ><span className='btn-link'>Hire one.</span></Link>
                        </Alert>
                            : bookingList?.map((x, i) => (
                                <Accordion.Item key={`booking-list-${i}`} eventKey={i}>
                                    <Accordion.Header>{x?.name}</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.name">
                                                <Form.Label>Name :</Form.Label>{' '}
                                                <Form.Label className="fw-bold">{x.name}</Form.Label>
                                            </Form.Group>

                                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.age">
                                                <Form.Label>Age :</Form.Label>{' '}
                                                <Form.Label className="fw-bold">{x.age}</Form.Label>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.gender">
                                                <Form.Label>Gender :</Form.Label>{' '}
                                                <Form.Label className="fw-bold">{x.gender}</Form.Label>
                                            </Form.Group>

                                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.Location">
                                                <Form.Label>Location :</Form.Label>{' '}
                                                <Form.Label className="fw-bold">{x.location}</Form.Label>
                                            </Form.Group>
                                        </Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.dlNo">
                                            <Form.Label>Driving Licence no. :</Form.Label>{' '}
                                            <Form.Label className="fw-bold">{x.drivingLicence}</Form.Label>
                                        </Form.Group>

                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.address">
                                            <Form.Label>Address :</Form.Label>{' '}
                                            <Form.Label className="fw-bold">{x.address}</Form.Label>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email :</Form.Label>{' '}
                                            <Form.Label className="fw-bold">{x.email}</Form.Label>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.mobile">
                                            <Form.Label>Mobile :</Form.Label>{' '}
                                            <Form.Label className="fw-bold">{x.mobile}</Form.Label>
                                        </Form.Group>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                    }

                </Accordion>
            }

        </>

    );
}

export default Bookings
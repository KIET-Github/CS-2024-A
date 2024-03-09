import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useBookDriver } from '../hooks/book';
import Spinner from 'react-bootstrap/Spinner';
import { useDriverList } from '../hooks/driver';



const BookDriverModal = ({ driverDetails, show, handleClose }) => {

  const { apiState, bookDriver } = useBookDriver()

  const { fetchDriverList } = useDriverList();

  const [bookingDetails, setBookingDetails] = useState({
    from: '',
    to: '',
    oneWay: false,
    roundTrip: false,
    date: '',
    time: ''
  })

  const handleInputChange = (e) => {
    const { name, value, id, checked } = e.target
    if (['oneWay', 'roundTrip'].includes(id)) {
      setBookingDetails({
        ...bookingDetails,
        oneWay: id == 'oneWay',
        roundTrip: id == 'roundTrip'
      })
    } else {
      setBookingDetails({
        ...bookingDetails,
        [name]: value
      })
    }

  }

  const handleSubmit = () => {

    const bookingDetailsObj = {
      ...driverDetails,
      driverId: driverDetails._id,
      ...bookingDetails
    }
    delete bookingDetailsObj._id
    console.log('bookingDetails++', bookingDetailsObj)

    bookDriver(bookingDetailsObj)
  }

  useEffect(() => {
    if (apiState == 'SUCCESS') {
      fetchDriverList()
      setBookingDetails({
        from: '',
        to: '',
        oneWay: false,
        roundTrip: false,
        date: '',
        time: ''
      })
    }
     
  }, [apiState])
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Book Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.name">
                <Form.Label>Name :</Form.Label>{' '}
                <Form.Label className="fw-bold">{driverDetails.name}</Form.Label>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="exampleForm.age">
                <Form.Label>Age :</Form.Label>{' '}
                <Form.Label className="fw-bold">{driverDetails.age}</Form.Label>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.gender">
                <Form.Label>Gender :</Form.Label>{' '}
                <Form.Label className="fw-bold">{driverDetails.gender}</Form.Label>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="exampleForm.Location">
                <Form.Label>Location :</Form.Label>{' '}
                <Form.Label className="fw-bold">{driverDetails.location}</Form.Label>
              </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3" controlId="exampleForm.dlNo">
              <Form.Label>Driving Licence no. :</Form.Label>{' '}
              <Form.Label className="fw-bold">{driverDetails.drivingLicence}</Form.Label>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="exampleForm.address">
              <Form.Label>Address :</Form.Label>{' '}
              <Form.Label className="fw-bold">{driverDetails.address}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email :</Form.Label>{' '}
              <Form.Label className="fw-bold">{driverDetails.email}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.mobile">
              <Form.Label>Mobile :</Form.Label>{' '}
              <Form.Label className="fw-bold">{driverDetails.mobile}</Form.Label>
            </Form.Group>
          </Card.Body>


        </Card>
        <Card>
          <Card.Body>
            <Row>
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  label="One Way"
                  name="group1"
                  type='radio'
                  id='oneWay'
                  onClick={handleInputChange}
                />
                <Form.Check
                  inline
                  label="Round Trip"
                  name="group1"
                  type='radio'
                  id='roundTrip'
                  onClick={handleInputChange}
                />
              </div>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Control value={bookingDetails.from} name='from' placeholder='Ghaziabad' onChange={handleInputChange} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>To</Form.Label>
                <Form.Control name='to' placeholder='Delhi' value={bookingDetails.to} onChange={handleInputChange} />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type='date' value={bookingDetails.date} name='date' onChange={handleInputChange} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type='time' value={bookingDetails.time} name='time' onChange={handleInputChange} />
              </Form.Group>
            </Row>


          </Card.Body>
        </Card>

        {
          (['SUCCESS', 'ERROR'].includes(apiState)) && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label className={apiState == 'ERROR' ? 'alert alert-danger' : 'alert alert-success'}>
                {apiState=='SUCCESS'&& 'Driver booked successfully'}
                {apiState=='ERROR'&& 'Unable to book driver. Please try again later'}
                </Form.Label>
            </Form.Group>
          )
        }

      </Modal.Body>
      <Modal.Footer>
        {
          (['SUCCESS', 'ERROR'].includes(apiState)) && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label className={apiState == 'ERROR' ? 'alert alert-danger' : 'alert alert-success'}>
                {apiState=='SUCCESS'&& 'Driver booked successfully'}
                {apiState=='ERROR'&& 'Unable to book driver. Please try again later'}
                </Form.Label>
            </Form.Group>
          )
        }
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={apiState == 'INIT'}>
          Submit
          {
            apiState == 'INIT' && <Spinner animation="border" role="status" size='sm'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }

        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BookDriverModal
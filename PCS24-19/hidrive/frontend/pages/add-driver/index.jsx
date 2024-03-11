import { useState } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { addDriverAPI } from '../../apiCalls/driverAPIs'


const AddDriver = () => {

    const [driverDetails, setDriverDetails] = useState(
        {
            name: '',
            age: '',
            gender: '',
            location: '',
            drivingLicence: '',
            address: '',
            email: '',
            mobile: ''
        }
    )
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setError({
            hasError: false,
            errorMessage: ''
        })
        setDriverDetails({
            ...driverDetails,
            [name]: value
        })
    }

    const handleAddDriverClick = () => {
        if (Object.keys(driverDetails).some(x => driverDetails[x] == '')) {
            setError({
                hasError: true,
                errorMessage: 'All fields are required'
            })
            return
        }
        addDriverAPI(driverDetails).then(res => {
            if (res.status == 201) {
                setError({
                    hasError: false,
                    errorMessage: 'Driver added successfully'
                })
                res.json(driver => {
                    console.log('driver++', driver)
                })
            }
        })

    }

    return (
        <div className="add-driver-page">
            <Container className="pt-4" >
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                <h2 className="text-center mb-3">Add Driver</h2>
                {
                    (error.hasError || error.errorMessage) && (
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label className={error.hasError ? 'alert alert-danger' : 'alert alert-success'}>{error.errorMessage}</Form.Label>
                        </Form.Group>
                    )
                }
                <Form>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' value={driverDetails.name} placeholder="John Doe" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control placeholder="18+" name='age' value={driverDetails.age} onChange={handleInputChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control placeholder="Male / Female / Others" name='gender' value={driverDetails.gender} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.Location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control placeholder="Ghaziabad" name='location' value={driverDetails.location} onChange={handleInputChange} />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} className="mb-3" controlId="exampleForm.dlNo">
                    <Form.Label>Driving Licence no.</Form.Label>
                    <Form.Control placeholder="UP14ASDF1123" name='drivingLicence' value={driverDetails.drivingLicence} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="exampleForm.address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} name='address' value={driverDetails.address} onChange={handleInputChange} />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name='email' value={driverDetails.email} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control placeholder="0123456789" name='mobile' value={driverDetails.mobile} onChange={handleInputChange} />
                    </Form.Group>
                </Row>
                
                    <Button variant="primary" className='w-100 fw-bolder' onClick={handleAddDriverClick}>Add Driver</Button>{' '}
                </Form>
                
                    
                </Col>
            </Row>
            </Container>
            
        </div>


    )
}
export default AddDriver
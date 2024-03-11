import { useState } from "react";
import { useDriverList } from '../../hooks/driver'
import Spinner from 'react-bootstrap/Spinner';
import BookdriverModal from  '../../components/BookDriverModal'
import { Form, Row, Col, Button, Table, Container,Alert } from "react-bootstrap";
import Protected from "../../components/Protected";

const DriverList = () => {
  const { apiState, driverList, fetchDriverList } = useDriverList();

    const [isBookDriverModal,setIsBookDriverModal] =useState(false)
    const [driverDetails,setdriverDetails] =useState(false)

    const  handleBookClick= (driverDetails) =>{
        setdriverDetails(driverDetails)
        setIsBookDriverModal(!isBookDriverModal)
    }

    return (
       <Protected>
        <div className="driver-list-page">
             {
            isBookDriverModal && <BookdriverModal show={isBookDriverModal} handleClose={setIsBookDriverModal} driverDetails={driverDetails} />
        }
          <Container>
            <h2 className="text-center mb-3">Driver List</h2>
            {(apiState == "UNINIT" || apiState == "INIT") && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
    
            {apiState == "SUCCESS" && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Location</th>
                    <th>Driving Licence</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    {/* <th>Button</th> */}
                  </tr>
                </thead>
                <tbody>
                  {driverList.map((x, i) => (
                    <tr key={`d-l-${i}`}>
                      <td>{i + 1}</td>
                      <td>{x.name}</td>
                      <td>{x.age}</td>
                      <td>{x.gender}</td>
                      <td>{x.Location}</td>
                      <td>{x.drivingLicence}</td>
                      <td>{x.address}</td>
                      <td>{x.email}</td>
                      <td>{x.mobile}</td>
                      <td>
                        {
                          x.isBooked ? <Button variant="dark" disabled>N/A</Button>
                          :<Button variant="dark" onClick={()=>handleBookClick(x)}>Book</Button>
                        }
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
    
            {apiState == "ERROR" && (
              <Alert variant='danger'>
                Failed to fetch driver list. Please{" "}
                <a onClick={fetchDriverList}>try again</a> later.
              </Alert>
            )}
        
      </Container>
    </div>
       </Protected>
        
  );
};
export default DriverList;

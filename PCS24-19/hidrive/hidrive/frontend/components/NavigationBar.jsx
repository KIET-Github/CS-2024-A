import Container from 'react-bootstrap/Container';
import Link from "next/link";
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux'
import { useUserrProfile } from '../hooks/user';
import { Button, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { logoutAPI } from '../apiCalls/authAPIs';
import { useLogout } from '../hooks/auth';

function NavigationBar() {
  const {logOut}= useLogout()
  useUserrProfile()
  const { userData } = useSelector((state => state.user))
  const { isLoggedin } = useSelector((state) => state.auth);

  const router = useRouter()
  const handleLoginClick = () => {
    router.push('/login')
  }

  const handleSignupClick = () => {
    router.push('/signup')

  }

  const handleLogoutClick = () =>{
    logOut()
  }
  return (
    <Navbar className='navbar-dark bg-dark px-4' >
      <Navbar.Brand >
        
          <Link href="/" className='ms-2' >
          <Navbar.Text>Hi Drive</Navbar.Text>
          </Link>
        
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav.Item className="me-3">
          <Nav.Link onClick={()=>{}} as={Link} href="/driver-list" className="text-white ms-2 text-white" >
            <Navbar.Text>
              Book Driver
            </Navbar.Text>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="me-3">
          <Nav.Link as={Link} className="text-white" href="/about-us">
            <Navbar.Text>
              About Us
            </Navbar.Text>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="me-3">
          <Nav.Link as={Link} className="text-white" href="/contact-us" >
            <Navbar.Text>
              Contact Us
            </Navbar.Text></Nav.Link>
        </Nav.Item>
        {
          isLoggedin ?
          <><Navbar.Text>
          Signed in as: <Link href="/user-profile" className='ms-2' ><span>{userData?.name}</span></Link>
        </Navbar.Text>
        <Button variant="primary" className='me-3' onClick={handleLogoutClick} >Logout</Button>{' '}
</>
            
            : <>
              <Button variant="primary" className='me-3' onClick={handleLoginClick} >Login</Button>{' '}
              <Button variant="outline-primary" onClick={handleSignupClick}>Signup</Button>{' '}
            </>

        }
      </Navbar.Collapse>


    </Navbar>
  );
}

export default NavigationBar;
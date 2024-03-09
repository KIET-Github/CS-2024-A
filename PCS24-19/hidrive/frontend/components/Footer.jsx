import Container from 'react-bootstrap/Container';
import Link from "next/link";
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux'
import { useUserrProfile } from '../hooks/user';
import { Button, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router'

function Footer() {
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
  return (

  <section className='footer-sec bg-dark text-white fixed-bottom'>
      <div class="container">
  <footer class="py-3">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-white">Home</a></li>
      <li class="nav-item"><a href="/contact-us" class="nav-link px-2 text-white">Contact us</a></li>
      <li class="nav-item"><a href="/about-us" class="nav-link px-2 text-white">About us</a></li>
    </ul>
    <p class="text-center text-white">© 2021 Company, Inc</p>
  </footer>
</div>
  </section>
  );
}

export default Footer;
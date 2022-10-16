
import { Navbar ,Button, Flowbite, DarkThemeToggle} from 'flowbite-react';
import { Link } from "react-router-dom";
import React from 'react';

// import { CgDarkMode  } from "react-icons/all/fa/CgDarkMode ";

function Nav() {
	
  return (
	<React.Fragment>
   
   <Navbar
  fluid={true}
  rounded={true}

>
  <Navbar.Brand href="https://flowbite.com/" >
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      className="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mb-6 md:mb-0">
      HSFD System
    </span>
  </Navbar.Brand>
  <div className="flex md:order-2 md:hidden">
    <Button>
      Get started
    </Button>
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      About
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Services
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Pricing
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link>
  
  
  </Navbar.Collapse>
  <div className="md:flex md:order-2 hidden">
  <Link to="/login">
  <Button >
      Register
    </Button>
    </Link>
  
    <div className="md:flex md:order-2 ml-2"><Flowbite>
  <DarkThemeToggle />
</Flowbite></div>
	</div>
  <div className="md:hidden "><Flowbite>
  <DarkThemeToggle />
</Flowbite></div>
</Navbar>
  </React.Fragment>
  )
}

export default Nav
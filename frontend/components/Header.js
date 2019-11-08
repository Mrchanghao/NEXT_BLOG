import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '../config';
import {signOut, isAuth} from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && 
            <>
              <NavItem>
              <Link href="/signin">
                <NavLink style={{cursor: 'pointer'}}>Signin</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signup">
                <NavLink style={{cursor: 'pointer'}}>Signup</NavLink>
              </Link>
            </NavItem>
            </>
            
            }
            
            {isAuth() && (
              <NavItem>
              
                <NavLink 
                  style={{cursor: 'pointer'}}
                  onClick={() => signOut(() => Router.replace('/signin'))}>
                    SignOut
                </NavLink>
              
            </NavItem>
            )}
            {(isAuth() && isAuth().role === 0) && (
              <NavItem>
                <Link href='/user'>
                <NavLink>
                  {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
            </NavItem>
            )}

            {(isAuth() && isAuth().role === 1) && (
              <NavItem>
                <Link href='/admin'>
                <NavLink>
                  {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
            </NavItem>
            )}
            

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
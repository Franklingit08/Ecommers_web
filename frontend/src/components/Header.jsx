import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'

function Header() {

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutUserMutation();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUserHandler = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      navigate('/')

    } catch (error) {
      toast.error('logout error')
    }
  }

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>

            <Navbar.Brand to="/" as={Link}>Goshoppie</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {userInfo ? (
                  <>
                    <NavDropdown title={userInfo.name} id="username">

                      <NavDropdown.Item as={Link} to={'/profile'}>
                        Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item onClick={logoutUserHandler}>
                        Logout
                      </NavDropdown.Item>

                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link as={Link} to={'/login'}>
                    <FaUser /> Sign In
                  </Nav.Link>
                )}

                {
                  userInfo && userInfo.isAdmin && (
                    <>

                      <NavDropdown title={'Admin'} id="adminname">

                        <NavDropdown.Item as={Link} to={'/admin/productlist'}>
                          Products
                        </NavDropdown.Item>

                        <NavDropdown.Item as={Link} to={'/admin/orderlist'}>
                          Orders
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/admin/userslist'}>
                          Users
                        </NavDropdown.Item>

                      </NavDropdown>

                    </>
                  )
                }

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header
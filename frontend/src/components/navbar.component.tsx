import { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";
import styled, { css } from 'styled-components';

const Link = styled(LinkRouter)`
  color: #FFC600 !important;
  font-weight: 300;
  margin-right: .7em;
  ${css`
    &:hover {
      color: white !important;
    }
  `}
`
const LinkBold = styled(Link)`
  font-size: 2em;
  font-weight: 700;
`

const Nav = styled.nav`
  padding: 1em 1.5em;
`

const Span = styled.span`
    font-size: .4em;
    font-weight: 300;
    letter-spacing: .3px;
    ${css`
    &:hover {
      color: inherit !important;
    }
  `}
`

export default class Navbar extends Component {

    render() {
      return (
        <Nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <LinkBold to="/" className="navbar-brand">ASTP <Span>(Employee Management Web App)</Span></LinkBold>
          <div className="collpase navbar-collapse justify-content-end">
            <ul className="navbar-nav flex-row">
              <li className="navbar-item">
                <Link to="/" className="nav-link ">All Employees</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">New Employee</Link>
              </li>
            </ul>
          </div>
        </Nav>
      );
    }
  }
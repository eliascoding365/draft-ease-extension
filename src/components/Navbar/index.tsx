import styled from 'styled-components';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-right: solid 1px #444444;
  border-left: solid 1px #444444;
`;

const Button = styled.button`
  color: #ffffff;
  font-size: 14px;
  background: none;
  padding: 10px;
  border-right: solid 1px #444444;
  border-left: solid 1px #444444;
  border-top: none;
  border-bottom: none;
  transition: background 0.3s ease;
  &:hover{
    background: #444444;
  }
`;


const Navbar = () => {
  return (

    <Nav>
      <Button>Home</Button>
      <Button>Create</Button>
      <Button>Drafts</Button>
    </Nav>
  );
};

export default Navbar;

import styled from 'styled-components';
import { Button } from "@/components/ui/button"

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 20px;
`;




const Navbar = () => {
  return (

    <Nav>
      <Button className='text-white p-0 text-base h-auto rounded-none bg-transparent hover:bg-transparent' >Create</Button>
      <Button className='text-white p-0 text-base h-auto rounded-none bg-transparent hover:bg-transparent' >Draft</Button>
    </Nav>
  );
};

export default Navbar;

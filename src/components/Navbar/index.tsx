import styled from 'styled-components';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import NoteBlock from '../NoteBlock';
import DraftList from '../DraftList';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin: 15px 15px 20px 15px;
`;




const Navbar: React.FC = () => {
  const [view, setView] = useState<'noteBlock' | 'drafts'>('noteBlock');

  return (
    <div >
    <Nav>
      <Button 
        onClick={() => setView('noteBlock')}
        className='
        text-white p-0 text-base h-auto
        rounded-none bg-transparent 
        hover:bg-transparent' >Create</Button>
      <Button 
        onClick={() => setView('drafts')}
        className='
        text-white p-0 text-base h-auto
        rounded-none bg-transparent 
        hover:bg-transparent' >Draft</Button>
    </Nav>
     {view === 'noteBlock' ? <NoteBlock /> : <DraftList />}
     </div>
    );
    };

export default Navbar;

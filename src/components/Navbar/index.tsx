import styled from 'styled-components';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import NoteBlock from '../NoteBlock';
import DraftList from '../DraftList';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 15px 15px 15px 15px;
  background-color: #000000;
  //background-color: trasparent;
  box-shadow: inset 0 0 0 0.5px #30363d;
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

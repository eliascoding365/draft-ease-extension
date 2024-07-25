import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface NoteValues {
  title: string;
  noteBody: string;
}

const DraftsContainer = styled.div`
  max-height: 390px; /* Definindo a altura máxima do contêiner */
  overflow-y: auto; /* Permitindo rolagem vertical */
  
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Cor do "polegar" da barra de rolagem */
    border-radius: 10px; /* Borda arredondada */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Cor do "polegar" da barra de rolagem ao passar o mouse */
  }

  ::-webkit-scrollbar-track {
    background: #333; /* Cor do "trilho" da barra de rolagem */
  }
`;

const DraftsTitle = styled.h2`
  display: flex;
  justify-content: start;
  font-size: 1.5rem;
  margin: 14px 2px 6px 2px;
  padding-left: 12px;
  color: white;
`;

const DraftItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 4px 12px 2px 14px;
`;

const Title = styled.h3`
  display: flex;
  justify-content: start;
  font-size: 16px;
  color: white;
  font-weight: 500;
`;

const Body = styled.p`
  display: flex;
  justify-content: start;
  text-align: justify ;
  font-size: 14px;
  color: white;
  font-weight: 200;
`;

const AlertDialog = styled.h3`
  margin-top: 14px;
  font-size: 1rem;
  color: white;
  font-weight: 100;
`;

const DraftList: React.FC = () => {
  const [drafts, setDrafts] = useState<NoteValues[]>([]);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['drafts'], (result) => {
        const drafts = result.drafts || [];
        setDrafts(drafts);
      });
    } else {
      console.error('Chrome API is not available.');
    }
  }, []);

  if (drafts.length === 0) {
    return <AlertDialog>Any note created.</AlertDialog>;
  }

  return (
    <DraftsContainer>
      <DraftsTitle>My drafts</DraftsTitle>
      {drafts.map((draft, index) => (
        <DraftItem key={index}>
          <Title>{draft.title}</Title>
          <Body>{draft.noteBody}</Body>
        </DraftItem>
      ))}
    </DraftsContainer>
  );
}

export default DraftList;

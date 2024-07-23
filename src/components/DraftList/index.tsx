import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface NoteValues {
  title: string;
  noteBody: string;
}

const DraftsContainer = styled.div``;

const DraftsTitle = styled.h2`
  display: flex;
  justify-content: start;
  font-size: 1.5rem;
  margin: 2px 15px 2px 15px;
  color: white
`
const DraftItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 2px 15px 2px 15px;

`;

const Title = styled.h3`
display: flex;
  justify-content: start;
  margin: 2px 15px 2px 15px;
  font-size: 18px;
  color: white;
  font-weight: 500;
`;

const Body = styled.p`
display: flex;
  justify-content: start;
  margin: 2px 15px 2px 15px;
  font-size: 14px;
  color: white;
  font-weight: 200;
  `;

const AlertDialog = styled.h3`
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
    return <AlertDialog>No drafts available.<Body>Bodynote</Body></AlertDialog>;
  }

  return (
    <DraftsContainer>
      <DraftsTitle>Drafts</DraftsTitle>
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

import React, { useCallback } from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { Session } from 'retro-board-common';

interface PreviousGameItemProps {
  session: Session;
  onClick: (session: Session) => void;
}

const PreviousGameItem = ({ session, onClick }: PreviousGameItemProps) => {
  const handleClick = useCallback(() => {
    onClick(session);
  }, [onClick, session]);
  return (
    <Card onClick={handleClick}>
      <CardHeader title={session.name || 'My Retrospective'} />
    </Card>
  );
};

export default PreviousGameItem;

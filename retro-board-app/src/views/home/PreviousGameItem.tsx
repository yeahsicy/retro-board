import React, { useCallback } from 'react';
import {
  Card as CardBase,
  CardHeader,
  CardContent,
  Tooltip,
} from '@material-ui/core';
import { Session, SessionMetadata } from 'retro-board-common';
import { AvatarGroup } from '@material-ui/lab';
import CustomAvatar from '../../components/Avatar';
import styled from 'styled-components';

interface PreviousGameItemProps {
  session: SessionMetadata;
  onClick: (session: SessionMetadata) => void;
}

const PreviousGameItem = ({ session, onClick }: PreviousGameItemProps) => {
  const handleClick = useCallback(() => {
    onClick(session);
  }, [onClick, session]);
  return (
    <Card onClick={handleClick}>
      <CardHeader title={session.name || 'My Retrospective'} />
      <CardContent>
        <AvatarGroup>
          {session.participants.map(user => {
            return (
              <Tooltip title={user.name} key={user.id}>
                <CustomAvatar user={user} />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </CardContent>
    </Card>
  );
};

const Card = styled(CardBase)`
  min-width: 500px;
`;

export default PreviousGameItem;

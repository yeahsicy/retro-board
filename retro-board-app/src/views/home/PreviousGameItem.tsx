import React, { useCallback } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Card as CardBase,
  CardHeader,
  CardContent,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Session, SessionMetadata } from 'retro-board-common';
import { AvatarGroup } from '@material-ui/lab';
import CustomAvatar from '../../components/Avatar';
import ItemStat from './ItemStat';
import styled from 'styled-components';
import useOnHover from '../../hooks/useOnHover';

interface PreviousGameItemProps {
  session: SessionMetadata;
  onClick: (session: SessionMetadata) => void;
}

const PreviousGameItem = ({ session, onClick }: PreviousGameItemProps) => {
  const [hover, hoverRef] = useOnHover();
  const handleClick = useCallback(() => {
    onClick(session);
  }, [onClick, session]);
  return (
    <Card onClick={handleClick} raised={hover} ref={hoverRef}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {formatDistanceToNow(
            Date.parse((session.created as unknown) as string)
          )}{' '}
          ago
        </Typography>
        <Typography variant="h5" component="h2">
          {session.name || 'My Retrospective'}
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: 20 }}>
          Created by <em>{session.createdBy.name}</em>
        </Typography>
        <Stats>
          <ItemStat
            value={session.numberOfPosts.toString()}
            label="posts"
            color="green"
          />
          <ItemStat
            value={session.participants.length.toString()}
            label="participants"
            color="blue"
          />
          <ItemStat
            value={(
              session.numberOfNegativeVotes + session.numberOfPositiveVotes
            ).toString()}
            label="votes"
            color="red"
          />
        </Stats>
        <AvatarGroup title="Participants">
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
  cursor: pointer;
`;

const Stats = styled.div`
  display: flex;
`;

export default PreviousGameItem;

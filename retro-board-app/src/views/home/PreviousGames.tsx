import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import md5 from 'md5';
import usePreviousSessions from '../../hooks/usePreviousSessions';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PreviousGameItem from './PreviousGameItem';
import { Session } from 'retro-board-common';

const getGravatar = (id: string) =>
  `https://www.gravatar.com/avatar/${md5(id)}?d=retro`;

const PreviousGames = () => {
  const history = useHistory();
  const previousSessions = usePreviousSessions();
  const redirectToGame = useCallback(
    (session: Session) => {
      history.push(`/game/${session.id}`);
    },
    [history]
  );
  return (
    <Container>
      {previousSessions.slice(0, 10).map(session => (
        <PreviousGameItem session={session} onClick={redirectToGame} />
      ))}
    </Container>
    // <List component="section">
    //   {previousSessions.slice(0, 10).map(session => (
    //     <ClickableListItem
    //       button
    //       key={session.id}
    //       onClick={() => redirectToGame(session.id)}
    //     >
    //       <ListItemAvatar>
    //         <Avatar
    //           alt={session.name || 'My Retrospective'}
    //           src={getGravatar(session.id)}
    //         />
    //       </ListItemAvatar>
    //       <ListItemText primary={session.name || 'My Retrospective'} />
    //     </ClickableListItem>
    //   ))}
    // </List>
  );
};

const ClickableListItem = styled(ListItem)`
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 20px;
  }
`;

export default PreviousGames;

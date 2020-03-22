import React from 'react';
import { PostGroup } from 'retro-board-common';
import styled from 'styled-components';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { colors } from '@material-ui/core';

interface GroupProps {
  group: PostGroup;
}

const Group: React.FC<GroupProps> = ({ group, children }) => {
  return (
    <Droppable droppableId={'group#' + group.id} key={group.id} mode="standard">
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <GroupContainer
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
          draggingOver={dropSnapshot.isDraggingOver}
        >
          <Label>{group.label}</Label>
          <div>{children}</div>
          {group.posts.length === 0 ? <NoPosts>(empty)</NoPosts> : null}
        </GroupContainer>
      )}
    </Droppable>
  );
};

const GroupContainer = styled.div<{ draggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px 2px;
  border: 2px dashed lightgray;
  border-radius: 10px;
  margin: 20px 0;
  background-color: ${props =>
    props.draggingOver ? colors.grey[100] : 'unset'};
`;

const Label = styled.div``;

const NoPosts = styled.div`
  color: grey;
  text-align: center;
  font-weight: 2em;
  margin: 30px;
`;

export default Group;

import React from 'react';
import { PostGroup } from 'retro-board-common';
import styled from 'styled-components';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { colors, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EditableLabel from '../../components/EditableLabel';

interface GroupProps {
  group: PostGroup;
  readonly: boolean;
  onEditLabel: (label: string) => void;
  onDelete: (group: PostGroup) => void;
}

const Group: React.FC<GroupProps> = ({
  group,
  onEditLabel,
  onDelete,
  readonly,
  children,
}) => {
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
          <DeleteContainer>
            <Button endIcon={<Delete />} onClick={() => onDelete(group)} />
          </DeleteContainer>
          <Label>
            <EditableLabel
              value={group.label}
              onChange={onEditLabel}
              readOnly={readonly}
            />
          </Label>
          <div>{children}</div>
          {group.posts.length === 0 ? <NoPosts>(empty)</NoPosts> : null}
        </GroupContainer>
      )}
    </Droppable>
  );
};

const GroupContainer = styled.div<{ draggingOver: boolean }>`
  position: relative;
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

const DeleteContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
`;

const NoPosts = styled.div`
  color: grey;
  text-align: center;
  font-weight: 2em;
  margin: 30px;
`;

export default Group;

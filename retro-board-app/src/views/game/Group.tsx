import React from 'react';
import { PostGroup } from 'retro-board-common';
import styled from 'styled-components';

interface GroupProps {
  group: PostGroup;
}

const Group = ({ group }: GroupProps) => {
  return <GroupContainer>{group.label}</GroupContainer>;
};

const GroupContainer = styled.div`
  padding: 20px;
  border: 2px dashed lightgray;
  border-radius: 10px;
  margin: 20px 0;
`;

export default Group;

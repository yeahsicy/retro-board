import React from 'react';
import { PostGroup } from 'retro-board-common';

interface GroupProps {
  group: PostGroup;
}

const Group = ({ group }: GroupProps) => {
  return <div>{group.label}</div>;
};

export default Group;

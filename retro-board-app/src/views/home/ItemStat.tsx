import React from 'react';
import styled from 'styled-components';

interface ItemStatProps {
  value: string;
  label: string;
  color: string;
}

const ItemStat = ({ value, label, color }: ItemStatProps) => {
  return (
    <Container>
      <Value style={{ color }}>{value}</Value>
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
`;

const Value = styled.div`
  font-size: 4em;
`;
const Label = styled.div`
  font-weight: 100px;
  font-size: 1em;
`;

export default ItemStat;

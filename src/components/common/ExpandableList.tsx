import React from 'react';
import styled from 'styled-components';

interface ExpandedListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const ExpandableList = <T,>({ items, renderItem }: ExpandedListProps<T>) => {
  return (
    <ListContainer>
      {items.map((item, index) => (
        <ListItem key={index}>{renderItem(item)}</ListItem>
      ))}
    </ListContainer>
  );
};

export default ExpandableList;

// Styled Components
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${({ theme }) => theme.padding[16]};
  border-radius: ${({ theme }) => theme.rounded[24]};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

const ListItem = styled.li`
  padding: ${({ theme }) => theme.padding[16]} 0;
  &:not(:first-child) {
    border-top: 0.1rem solid ${({ theme }) => theme.colors.neutral50};
  }
`;

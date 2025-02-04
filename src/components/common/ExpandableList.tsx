import styled from 'styled-components';

/**
 * Props for the ExpandableList component.
 * @template T - The type of the items in the list.
 */
interface ExpandedListProps<T> {
  /**
   * An array of items to display in the list.
   * @template T - The type of the items in the list.
   * @type {T[]}
   */
  items: T[];

  /**
   * A function to render each item in the list.
   * @template T - The type of the items in the list.
   * @param {T} item - The current item in the list.
   * @returns {React.ReactNode} The rendered JSX for the item.
   */
  renderItem: (item: T) => React.ReactNode;
}

/**
 * A component for rendering a vertically expandable list of items.
 * Adds a `border-top` style to all items except the first.
 * @template T - The type of the items in the list.
 * @param {ExpandedListProps<T>} props - The props for the component.
 */
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

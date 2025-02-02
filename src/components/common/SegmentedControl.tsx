import { useCallback, useState } from 'react';
import styled from 'styled-components';

/**
 * Props for SegmentedButton component
 * @template T - Type of value in config, must be string
 */
interface SegmentedButtonProps<T extends string> {
  /**
   * Configuration for segmented buttons.
   * Each object includes a value and a label.
   */
  config: { value: T; label: string }[];
  /**
   * Callback function that is called when a button is clicked.
   * @param value - Value of the clicked button
   */
  onSegmentChange: (value: T) => void;
  /**
   * Default value of the segmented button.
   * If not provided, the first value in config will be selected.
   */
  defaultValue?: T;
}

const SegmentedButton = <T extends string>({
  config,
  onSegmentChange,
  defaultValue,
}: SegmentedButtonProps<T>) => {
  const initialValue =
    defaultValue !== undefined &&
    config.some((option) => option.value === defaultValue)
      ? defaultValue
      : config[0].value;

  const [selected, setSelected] = useState<T>(initialValue);

  const handleChange = useCallback(
    (value: T) => {
      setSelected(value);
      onSegmentChange(value);
    },
    [onSegmentChange],
  );

  const selectedIndex = config.findIndex((option) => option.value === selected);

  return (
    <ButtonsContainer length={config.length}>
      <SelectedBackground position={selectedIndex} length={config.length} />
      {config.map((option) => (
        <Button
          key={option.value}
          isSelected={selected === option.value}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonsContainer>
  );
};

export default SegmentedButton;

// Styled Components
const ButtonsContainer = styled.div<{ length: number }>`
  position: relative;
  display: flex;
  border: solid 0.1rem ${({ theme }) => theme.colors.blue300};
  border-radius: ${({ theme }) => theme.rounded['24']};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;

  button {
    flex: ${({ length }) => `0 0 calc(100% / ${length})`};
  }
`;

const SelectedBackground = styled.div<{ position: number; length: number }>`
  position: absolute;
  top: ${({ theme }) => theme.padding['2']};
  bottom: ${({ theme }) => theme.padding['2']};
  left: ${({ position, length, theme }) =>
    `calc(${position * (100 / length)}% + ${theme.padding['2']})`};
  width: ${({ length, theme }) =>
    `calc(100% / ${length} - ${theme.padding['4']} )`};
  background-color: ${({ theme }) => theme.colors.blue500};
  border-radius: ${({ theme }) => theme.rounded['24']};
  transition:
    left 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
`;

const Button = styled.button<{ isSelected: boolean }>`
  position: relative;
  flex: 1;
  padding: 0.5rem;
  background-color: transparent;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.neutral0 : theme.colors.blue500};
  transition: color 0.3s ease;
`;

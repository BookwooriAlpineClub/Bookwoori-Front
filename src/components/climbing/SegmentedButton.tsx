import React, { useState } from 'react';
import styled from 'styled-components';

type ViewType = 'climbing' | 'review';

interface SegmentedButtonProps {
  onSegmentChange: (value: ViewType) => void;
}

const SEGMENTED_BUTTON_CONFIG: { value: ViewType; label: string }[] = [
  { value: 'climbing', label: '클라이밍' },
  { value: 'review', label: '감상평' },
];

const SegmentedButton = ({ onSegmentChange }: SegmentedButtonProps) => {
  const [selected, setSelected] = useState<ViewType>(
    SEGMENTED_BUTTON_CONFIG[0].value,
  );

  const handleChange = (value: ViewType) => {
    setSelected(value);
    onSegmentChange(value);
  };

  const selectedIndex = SEGMENTED_BUTTON_CONFIG.findIndex(
    (option) => option.value === selected,
  );

  return (
    <Container>
      <SelectedBackground position={selectedIndex} />
      {SEGMENTED_BUTTON_CONFIG.map((option) => (
        <Button
          key={option.value}
          isSelected={selected === option.value}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </Container>
  );
};

export default SegmentedButton;

// Styled Components
const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border: solid 0.1rem ${({ theme }) => theme.colors.blue200};
  border-radius: 1.625rem;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const SelectedBackground = styled.div<{ position: number }>`
  position: absolute;
  top: 0.125rem;
  bottom: 0.125rem;
  left: ${({ position }) => `calc(${position * 50}% + 0.125rem)`};
  width: calc(50% - 0.125rem - 0.125rem);
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 1.625rem;
  transition:
    left 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
`;

const Button = styled.button<{ isSelected: boolean }>`
  position: relative;
  flex: 1;
  padding: 0.625rem;
  background-color: transparent;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.white : theme.colors.black100};
  transition: color 0.3s ease;
`;

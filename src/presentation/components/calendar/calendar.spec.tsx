import { Calendar } from '@/presentation/components';
import { render, screen } from '@testing-library/react';
import React from 'react';

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const date = new Date('2023-06-26T00:00:00');

    makeSut(date);
    expect(screen.getByTestId('day')).toHaveTextContent('26');
    expect(screen.getByTestId('month')).toHaveTextContent('jun');
    expect(screen.getByTestId('year')).toHaveTextContent('2023');
  });

  test('Should render with correct values', () => {
    const date = new Date('2022-05-03T00:00:00');

    makeSut(date);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });
});

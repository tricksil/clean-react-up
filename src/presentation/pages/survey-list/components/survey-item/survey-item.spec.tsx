import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { IconName } from '@/presentation/components';
import { mockSurveyModel } from '@/domain/test';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date('2023-06-26T00:00:00');
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('26');
    expect(screen.getByTestId('month')).toHaveTextContent('jun');
    expect(screen.getByTestId('year')).toHaveTextContent('2023');
  });
});

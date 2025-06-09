import { render, screen } from '@testing-library/react';
import PollList from './PollList';

test('відображає передані опитування', () => {
  const polls = [
    { id: 1, question: 'Q1', options: [{ text: 'Yes', votes: 1 }] },
    { id: 2, question: 'Q2', options: [{ text: 'No', votes: 0 }] },
  ];
  render(<PollList polls={polls} onSelect={() => {}} vote={() => {}} />);
  expect(screen.getByText(/Q1/i)).toBeInTheDocument();
  expect(screen.getByText(/Q2/i)).toBeInTheDocument();
});

test('відображає "Опитувань ще немає" якщо список порожній', () => {
  render(<PollList polls={[]} onSelect={() => {}} vote={() => {}} />);
  expect(screen.getByText(/Опитувань ще немає/i)).toBeInTheDocument();
});

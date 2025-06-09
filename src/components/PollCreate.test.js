import { render, screen } from '@testing-library/react';
import PollCreate from './PollCreate';

test('рендерить поля створення опитування', () => {
  render(<PollCreate addPoll={jest.fn()} />);
  expect(screen.getByPlaceholderText(/Питання/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Варіант 1/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Варіант 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Додати варіант/i)).toBeInTheDocument();
});

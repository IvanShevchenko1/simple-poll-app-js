import { render, screen } from '@testing-library/react';
import App from './App';

test('рендерить форму логіну якщо неавторизовано', () => {
  render(<App />);
  expect(screen.getByText(/Вхід до сайту/i)).toBeInTheDocument();
});

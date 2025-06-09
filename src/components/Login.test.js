import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('рендерить email та пароль', () => {
  render(<Login onLogin={jest.fn()} />);
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
});

test('відображає помилку при неправильному логіні', () => {
  const mockLogin = jest.fn((email, pass, setErr) => setErr(true));
  render(<Login onLogin={mockLogin} />);
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'wrongpass' } });
  fireEvent.click(screen.getByText(/Увійти/i));
  expect(screen.getByText(/Неправильний email або пароль/i)).toBeInTheDocument();
});

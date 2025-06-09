import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

test('рендерить всі поля форми реєстрації', () => {
  render(<Register onRegister={jest.fn()} />);
  expect(screen.getByPlaceholderText(/Ім.?я/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
  expect(screen.getByText(/Стать/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Дата народження/i)).toBeInTheDocument();
});

test('відправляє форму при заповнених полях', () => {
  const onRegister = jest.fn();
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.getByPlaceholderText(/Ім.?я/i), { target: { value: 'Ivan' } });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'ivan@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: '12345' } });
  fireEvent.change(screen.getByPlaceholderText(/Дата народження/i), { target: { value: '2000-01-01' } });
  fireEvent.change(screen.getByText(/Стать/i).parentNode, { target: { value: 'Чоловіча' } });
  fireEvent.click(screen.getByText(/Зареєструватися/i));
  expect(onRegister).toHaveBeenCalled();
});

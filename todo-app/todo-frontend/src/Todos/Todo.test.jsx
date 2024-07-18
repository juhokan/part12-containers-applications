import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

const mockTodo = { id: 1, text: 'Sample Todo', done: false };
const mockDeleteTodo = null
const mockCompleteTodo = null

test('renders todo', () => {
  render(<Todo todo={mockTodo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />);

  const element = screen.getByText((content) => {
    return content.includes(mockTodo.text)
  })

  expect(element).toBeDefined()
});
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import Home from '../page';
import '@testing-library/jest-dom/vitest';

// Mock the external function used in the Home component
vi.mock('../functions', () => ({
  default: vi.fn(),
}));

// Clean up the DOM after each test to prevent memory leaks
afterEach(() => {
  cleanup();
});

describe('Page Component', () => {
  it('renders input field and button', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Type your incident');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows error when input has less than 5 characters', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Type your incident');

    // Simulate user typing in the input field and pressing Enter
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const errorMessage = screen.getByText(
      'The text must be at least 5 characters.',
    );
    expect(errorMessage).not.toBeNull();
  });

  it('shows error when input exceeds 225 characters', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Type your incident');

    fireEvent.change(input, { target: { value: 'a'.repeat(225) } });

    const errorMessage = screen.getByText(
      'The text should no be more than 225 characters',
    );
    expect(errorMessage).not.toBeNull();
  });

  it('calls  when valid input is submitted', async () => {
    // Mock the sendRequest function to resolve with test data
    vi.mock('../functions', () => ({
      default: vi
        .fn()
        .mockResolvedValue({ date: '2024-02-04', description: 'Test event' }),
    }));

    const sendRequest = (await import('../functions')).default;

    render(<Home />);
    const input = screen.getByPlaceholderText('Type your incident');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'A valid event description' } });
    fireEvent.click(button);

    // Wait for the function call and validate the arguments passed to it
    await waitFor(() => {
      expect(sendRequest).toHaveBeenCalledOnce();
      expect(sendRequest).toHaveBeenCalledWith({
        input: 'A valid event description',
      });
    });
  });

  it('displays loading state while waiting for response', async () => {
    vi.mock('../functions', () => ({
      default: vi.fn(() => new Promise(() => {})),
    }));

    render(<Home />);
    const input = screen.getByPlaceholderText('Type your incident');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'A valid description' } });
    fireEvent.click(button);
    // Wait for the loading element to appear in the DOM
    const loadingElement = await screen.findByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).not.toBeNull();
  });
});

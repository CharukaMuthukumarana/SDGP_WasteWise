import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecyclingLogin2 from '../app/logins/recyclinglogin2';

// Mock Expo Router module
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        // Mock user data for testing
        { recyclingUsername: 'testUser', password: 'password' },
      ]),
  })
);

describe('<RecyclingLogin2 />', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin2 />);
    
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('logs in with correct username and password', async () => {
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin2 />);
    
    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password');

    fireEvent.press(getByText('Log In'));

    // Check if fetch is called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers');
  });

  it('displays error message for incorrect username or password', async () => {
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin2 />);
    
    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'wrongPassword');

    fireEvent.press(getByText('Log In'));

    // Check if fetch is called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers');

  });

  it('displays error message for failed login', async () => {
    // Mock fetch function to simulate a failed request
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin2 />);
    
    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password');

    fireEvent.press(getByText('Log In'));

    // Check if fetch is called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers');

  });
});

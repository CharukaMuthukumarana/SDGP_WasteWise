import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecyclingLogin from '../app/logins/recyclinglogin';

// Mock Expo Router module
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

describe('<RecyclingLogin />', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin />);
    
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByPlaceholderText('Johndoe@mail.com')).toBeTruthy();
    expect(getByPlaceholderText('Enter your mobile number')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    // Add more assertions for other elements as needed
  });

  it('registers a new user', async () => {
    const { getByPlaceholderText, getByText } = render(<RecyclingLogin />);
    
    // Fill in the form fields
    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'TestUser');
    fireEvent.changeText(getByPlaceholderText('Johndoe@mail.com'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your mobile number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm password'), 'password'); // Confirm password

    // Press the register button
    fireEvent.press(getByText('Register'));

    // Check if fetch is called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recyclingUsername: 'TestUser',
        password: 'password',
        mobileNumber: '1234567890',
        email: 'test@example.com',
      }),
    });

  });
});

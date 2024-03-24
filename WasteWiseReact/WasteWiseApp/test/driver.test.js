import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DriverHome from '../app/driver/driverhome';

// Mock Expo Router module
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useLocalSearchParams: jest.fn().mockReturnValue({ username: 'TestUser' }),
}));

describe('<DriverHome />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DriverHome />);
    
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('TestUser')).toBeTruthy();
    expect(getByText('View Map')).toBeTruthy();
  });


  it('navigates to View Map screen on button press', () => {
    const { getByText } = render(<DriverHome />);
    
    fireEvent.press(getByText('View Map'));

  });
});

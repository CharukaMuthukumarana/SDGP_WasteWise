import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecyclingHome from '../app/recycling/recyclinghome';

// Mock Expo Router module
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useLocalSearchParams: jest.fn().mockReturnValue({ username: 'TestUser' }),
}));

describe('<RecyclingHome />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<RecyclingHome />);
    
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('TestUser')).toBeTruthy();
    expect(getByText('View Map')).toBeTruthy();
  });


  it('navigates to View Map screen on button press', () => {
    const { getByText } = render(<RecyclingHome />);
    
    fireEvent.press(getByText('View Map'));

    expect(require('expo-router').router.push).toHaveBeenCalledWith('recycling/recyclingviewmap');
  });
});

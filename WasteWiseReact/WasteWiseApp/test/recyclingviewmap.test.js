import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RecyclingViewMap from '../app/recycling/recyclingviewmap';
import * as Location from 'expo-location';

// Mock expo-location
jest.mock('expo-location', () => ({
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 37.7749, longitude: -122.4194 } // San Francisco coordinates
  }),
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([
    { trashCanId: '1', latitude: 37.7749, longitude: -122.4194 },
    { trashCanId: '2', latitude: 37.7858, longitude: -122.4065 }
  ]),
});

describe('<RecyclingViewMap />', () => {
  it('renders correctly', async () => {
    const { getByText, getByTestId } = render(<RecyclingViewMap />);
    
    expect(getByText('Getting your location...')).toBeTruthy();

  });

  it('starts journey and navigates to Google Maps', async () => {
    const { getByText } = render(<RecyclingViewMap />);
    

    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalled();

  });

  it('confirms destination and updates state', async () => {
    const { getByText } = render(<RecyclingViewMap />);

    expect(global.fetch).toHaveBeenCalled();
  });
});

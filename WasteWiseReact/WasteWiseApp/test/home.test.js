import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../app/home';

// Mock the expo-router module
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('<Home />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Waste Wise')).toBeTruthy();
  });

  it('navigates to company login screen on company button press', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Company'));
    expect(require('expo-router').router.push).toHaveBeenCalledWith('/logins/companylogin');
  });

  it('navigates to recycling login screen on recycling button press', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Recycling'));
    expect(require('expo-router').router.push).toHaveBeenCalledWith('/logins/recyclinglogin');
  });

  it('navigates to driver login screen on driver button press', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Driver'));
    expect(require('expo-router').router.push).toHaveBeenCalledWith('/logins/driverlogin');
  });

  it('navigates to add trash cans screen on "Add Trash Cans" link press', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Add Trash Cans'));
    expect(require('expo-router').router.push).toHaveBeenCalledWith('/addtrashcan');
  });

  it('navigates to device data screen on "device data" link press', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('device data'));
    expect(require('expo-router').router.push).toHaveBeenCalledWith('/devicedata');
  });
});

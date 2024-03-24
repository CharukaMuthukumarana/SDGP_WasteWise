import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import companymonitortrash from '../app/company/companymonitortrash';

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([
    { trashCanId: '1', collectionDate: new Date(), wasteType: 'PAPER', sensorData: [{ binlevel: 70 }] },
    { trashCanId: '2', collectionDate: new Date(), wasteType: 'PLASTIC', sensorData: [{ binlevel: 90 }] },
    // Add more sample data as needed
  ]),
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('<companymonitortrash />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<companymonitortrash />);

  });

  it('displays trash data', () => {
    const { getByText } = render(<companymonitortrash />);

  });

  it('navigates to trash details', () => {
    const { getByText } = render(<companymonitortrash />);
  });
});

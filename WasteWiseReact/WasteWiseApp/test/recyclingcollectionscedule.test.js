import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecyclingCollectionSchedule from '../app/recycling/recyclingcollectionschedule';

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([
    { trashCanId: '1', collectionDate: new Date(), wasteType: 'PAPER', collectionState: 'Scheduled' },
    { trashCanId: '2', collectionDate: new Date(), wasteType: 'PLASTIC', collectionState: 'Scheduled' },
    // Add more sample data as needed
  ]),
});

describe('<RecyclingCollectionSchedule />', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<RecyclingCollectionSchedule />);
    
    await waitFor(() => {
      expect(getByText('Waste Wise')).toBeTruthy();
    });
  });

});

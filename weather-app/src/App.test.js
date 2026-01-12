import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios to prevent network calls and potential ESM issues
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <span>SearchIcon</span>,
  Save: () => <span>SaveIcon</span>,
  Sun: () => <span>SunIcon</span>,
  Moon: () => <span>MoonIcon</span>,
  Cloud: () => <span>CloudIcon</span>,
  Droplets: () => <span>DropletsIcon</span>,
  Wind: () => <span>WindIcon</span>,
  Thermometer: () => <span>ThermometerIcon</span>,
  Clock: () => <span>ClockIcon</span>,
  Calendar: () => <span>CalendarIcon</span>,
  Trash2: () => <span>TrashIcon</span>,
  MapPin: () => <span>MapPinIcon</span>,
  Bookmark: () => <span>BookmarkIcon</span>,
}));

test('renders weather app title', async () => {
  render(<App />);
  const titleElement = screen.getByText(/WeatherApp/i);
  expect(titleElement).toBeInTheDocument();
});

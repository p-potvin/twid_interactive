import { CountryData } from '../types';

export const COUNTRIES_DATA: Record<string, CountryData> = {
  // North America
  '840': { id: '840', name: 'United States', lat: 38.0, lon: -97.0, peakSeasons: [6, 7, 8], touristType: 'Diverse (Nature, Cities, Culture)', owid: { workMinutes: 251, sleepMinutes: 528, leisureMinutes: 300, unpaidCare: { male: 145, female: 242 } } },
  '124': { id: '124', name: 'Canada', lat: 56.1, lon: -106.3, peakSeasons: [6, 7, 8, 9], touristType: 'Nature, Adventure, Cities', owid: { workMinutes: 230, sleepMinutes: 515, leisureMinutes: 305, unpaidCare: { male: 150, female: 240 } } },
  '484': { id: '484', name: 'Mexico', lat: 23.6, lon: -102.5, peakSeasons: [12, 1, 2, 3, 4], touristType: 'Beaches, Historical Ruins, Culinary', owid: { workMinutes: 294, sleepMinutes: 480, leisureMinutes: 240, unpaidCare: { male: 116, female: 373 } } },
  
  // South America
  '076': { id: '076', name: 'Brazil', lat: -14.2, lon: -51.9, peakSeasons: [12, 1, 2, 3], touristType: 'Festivals, Beaches, Nature', owid: { workMinutes: 240, sleepMinutes: 490, leisureMinutes: 280, unpaidCare: { male: 100, female: 250 } } },
  '032': { id: '032', name: 'Argentina', lat: -38.4, lon: -63.6, peakSeasons: [12, 1, 2, 3], touristType: 'Nature, Wine, Culture', owid: { workMinutes: 235, sleepMinutes: 500, leisureMinutes: 290, unpaidCare: { male: 110, female: 260 } } },
  '170': { id: '170', name: 'Colombia', lat: 4.5, lon: -74.0, peakSeasons: [12, 1, 2, 7, 8], touristType: 'Nature, Culture, Coffee', owid: { workMinutes: 270, sleepMinutes: 485, leisureMinutes: 260, unpaidCare: { male: 90, female: 280 } } },
  '604': { id: '604', name: 'Peru', lat: -9.1, lon: -75.0, peakSeasons: [5, 6, 7, 8, 9], touristType: 'Historical Ruins, Culinary, Nature', owid: { workMinutes: 280, sleepMinutes: 475, leisureMinutes: 250, unpaidCare: { male: 85, female: 290 } } },
  '152': { id: '152', name: 'Chile', lat: -35.6, lon: -71.5, peakSeasons: [12, 1, 2, 3], touristType: 'Nature, Wine, Adventure', owid: { workMinutes: 255, sleepMinutes: 495, leisureMinutes: 275, unpaidCare: { male: 105, female: 255 } } },

  // Europe
  '826': { id: '826', name: 'United Kingdom', lat: 55.3, lon: -3.4, peakSeasons: [6, 7, 8], touristType: 'Historical, Cultural, Cities', owid: { workMinutes: 215, sleepMinutes: 508, leisureMinutes: 310, unpaidCare: { male: 140, female: 250 } } },
  '250': { id: '250', name: 'France', lat: 46.2, lon: 2.2, peakSeasons: [6, 7, 8], touristType: 'Cultural, Culinary, Romance', owid: { workMinutes: 175, sleepMinutes: 513, leisureMinutes: 320, unpaidCare: { male: 134, female: 224 } } },
  '276': { id: '276', name: 'Germany', lat: 51.1, lon: 10.4, peakSeasons: [5, 6, 7, 8, 9], touristType: 'Historical, Cultural, Nature', owid: { workMinutes: 195, sleepMinutes: 505, leisureMinutes: 330, unpaidCare: { male: 164, female: 244 } } },
  '380': { id: '380', name: 'Italy', lat: 41.8, lon: 12.5, peakSeasons: [5, 6, 7, 8, 9], touristType: 'Historical, Culinary, Art', owid: { workMinutes: 149, sleepMinutes: 498, leisureMinutes: 330, unpaidCare: { male: 104, female: 306 } } },
  '724': { id: '724', name: 'Spain', lat: 40.4, lon: -3.7, peakSeasons: [6, 7, 8, 9], touristType: 'Beaches, Cultural, Nightlife', owid: { workMinutes: 176, sleepMinutes: 516, leisureMinutes: 340, unpaidCare: { male: 114, female: 258 } } },
  '528': { id: '528', name: 'Netherlands', lat: 52.1, lon: 5.2, peakSeasons: [4, 5, 6, 7, 8], touristType: 'Cities, Culture, Cycling', owid: { workMinutes: 185, sleepMinutes: 510, leisureMinutes: 325, unpaidCare: { male: 150, female: 230 } } },
  '752': { id: '752', name: 'Sweden', lat: 60.1, lon: 18.6, peakSeasons: [6, 7, 8], touristType: 'Nature, Design, Culture', owid: { workMinutes: 190, sleepMinutes: 500, leisureMinutes: 345, unpaidCare: { male: 170, female: 210 } } },
  '578': { id: '578', name: 'Norway', lat: 60.4, lon: 8.4, peakSeasons: [6, 7, 8], touristType: 'Fjords, Nature, Adventure', owid: { workMinutes: 180, sleepMinutes: 505, leisureMinutes: 350, unpaidCare: { male: 165, female: 215 } } },
  '246': { id: '246', name: 'Finland', lat: 61.9, lon: 25.7, peakSeasons: [6, 7, 8, 12], touristType: 'Nature, Lakes, Winter Sports', owid: { workMinutes: 185, sleepMinutes: 515, leisureMinutes: 340, unpaidCare: { male: 160, female: 220 } } },
  '616': { id: '616', name: 'Poland', lat: 51.9, lon: 19.1, peakSeasons: [5, 6, 7, 8, 9], touristType: 'Historical, Cities, Nature', owid: { workMinutes: 220, sleepMinutes: 500, leisureMinutes: 290, unpaidCare: { male: 130, female: 270 } } },
  '643': { id: '643', name: 'Russia', lat: 61.5, lon: 105.3, peakSeasons: [6, 7, 8], touristType: 'Historical, Cultural, Nature', owid: { workMinutes: 245, sleepMinutes: 510, leisureMinutes: 280, unpaidCare: { male: 110, female: 290 } } },

  // Asia
  '156': { id: '156', name: 'China', lat: 35.8, lon: 104.1, peakSeasons: [4, 5, 9, 10], touristType: 'Historical, Cultural, Nature', owid: { workMinutes: 315, sleepMinutes: 450, leisureMinutes: 250, unpaidCare: { male: 91, female: 234 } } },
  '356': { id: '356', name: 'India', lat: 20.5, lon: 78.9, peakSeasons: [10, 11, 12, 1, 2, 3], touristType: 'Cultural, Historical, Spiritual', owid: { workMinutes: 260, sleepMinutes: 510, leisureMinutes: 250, unpaidCare: { male: 52, female: 352 } } },
  '392': { id: '392', name: 'Japan', lat: 36.2, lon: 138.2, peakSeasons: [3, 4, 10, 11], touristType: 'Cultural, Culinary, Nature', owid: { workMinutes: 326, sleepMinutes: 442, leisureMinutes: 270, unpaidCare: { male: 41, female: 224 } } },
  '410': { id: '410', name: 'South Korea', lat: 35.9, lon: 127.7, peakSeasons: [3, 4, 5, 9, 10, 11], touristType: 'Cultural, Culinary, Cities', owid: { workMinutes: 310, sleepMinutes: 460, leisureMinutes: 260, unpaidCare: { male: 45, female: 227 } } },
  '360': { id: '360', name: 'Indonesia', lat: -0.7, lon: 113.9, peakSeasons: [5, 6, 7, 8, 9], touristType: 'Beaches, Nature, Culture', owid: { workMinutes: 250, sleepMinutes: 490, leisureMinutes: 270, unpaidCare: { male: 80, female: 260 } } },
  '764': { id: '764', name: 'Thailand', lat: 15.8, lon: 100.9, peakSeasons: [11, 12, 1, 2, 3], touristType: 'Beaches, Culinary, Culture', owid: { workMinutes: 265, sleepMinutes: 485, leisureMinutes: 265, unpaidCare: { male: 75, female: 275 } } },
  '704': { id: '704', name: 'Vietnam', lat: 14.0, lon: 108.2, peakSeasons: [11, 12, 1, 2, 3, 4], touristType: 'Nature, Culinary, History', owid: { workMinutes: 275, sleepMinutes: 480, leisureMinutes: 255, unpaidCare: { male: 85, female: 265 } } },
  '608': { id: '608', name: 'Philippines', lat: 12.8, lon: 121.7, peakSeasons: [12, 1, 2, 3, 4, 5], touristType: 'Beaches, Nature, Diving', owid: { workMinutes: 260, sleepMinutes: 495, leisureMinutes: 260, unpaidCare: { male: 95, female: 255 } } },
  '458': { id: '458', name: 'Malaysia', lat: 4.2, lon: 109.1, peakSeasons: [12, 1, 2, 6, 7, 8], touristType: 'Cities, Nature, Culinary', owid: { workMinutes: 255, sleepMinutes: 490, leisureMinutes: 275, unpaidCare: { male: 90, female: 250 } } },

  // Oceania
  '036': { id: '036', name: 'Australia', lat: -25.2, lon: 133.7, peakSeasons: [12, 1, 2], touristType: 'Nature, Beaches, Adventure', owid: { workMinutes: 211, sleepMinutes: 512, leisureMinutes: 315, unpaidCare: { male: 171, female: 311 } } },
  '554': { id: '554', name: 'New Zealand', lat: -40.9, lon: 174.8, peakSeasons: [12, 1, 2, 3], touristType: 'Nature, Adventure, Scenery', owid: { workMinutes: 205, sleepMinutes: 515, leisureMinutes: 320, unpaidCare: { male: 165, female: 300 } } },

  // Africa & Middle East
  '710': { id: '710', name: 'South Africa', lat: -30.5, lon: 22.9, peakSeasons: [11, 12, 1, 2, 3], touristType: 'Wildlife, Scenery, Wine', owid: { workMinutes: 190, sleepMinutes: 530, leisureMinutes: 300, unpaidCare: { male: 90, female: 250 } } },
  '818': { id: '818', name: 'Egypt', lat: 26.8, lon: 30.8, peakSeasons: [10, 11, 12, 1, 2, 3, 4], touristType: 'Historical Ruins, Culture', owid: { workMinutes: 240, sleepMinutes: 500, leisureMinutes: 260, unpaidCare: { male: 60, female: 320 } } },
  '566': { id: '566', name: 'Nigeria', lat: 9.0, lon: 8.6, peakSeasons: [11, 12, 1, 2], touristType: 'Culture, Cities, Nature', owid: { workMinutes: 280, sleepMinutes: 490, leisureMinutes: 240, unpaidCare: { male: 70, female: 310 } } },
  '404': { id: '404', name: 'Kenya', lat: -0.02, lon: 37.9, peakSeasons: [7, 8, 9, 12, 1, 2], touristType: 'Wildlife Safaris, Nature', owid: { workMinutes: 270, sleepMinutes: 495, leisureMinutes: 250, unpaidCare: { male: 80, female: 300 } } },
  '504': { id: '504', name: 'Morocco', lat: 31.7, lon: -7.0, peakSeasons: [3, 4, 5, 9, 10, 11], touristType: 'Culture, Desert, Culinary', owid: { workMinutes: 250, sleepMinutes: 505, leisureMinutes: 255, unpaidCare: { male: 65, female: 315 } } },
  '682': { id: '682', name: 'Saudi Arabia', lat: 23.8, lon: 45.0, peakSeasons: [11, 12, 1, 2, 3], touristType: 'Spiritual, Desert, Cities', owid: { workMinutes: 260, sleepMinutes: 480, leisureMinutes: 270, unpaidCare: { male: 55, female: 330 } } },
  '792': { id: '792', name: 'Turkey', lat: 38.9, lon: 35.2, peakSeasons: [6, 7, 8, 9], touristType: 'Historical, Beaches, Culinary', owid: { workMinutes: 245, sleepMinutes: 495, leisureMinutes: 280, unpaidCare: { male: 65, female: 305 } } },
  '364': { id: '364', name: 'Iran', lat: 32.4, lon: 53.6, peakSeasons: [3, 4, 5, 9, 10], touristType: 'Historical, Culture, Nature', owid: { workMinutes: 255, sleepMinutes: 490, leisureMinutes: 265, unpaidCare: { male: 70, female: 310 } } },
  '784': { id: '784', name: 'United Arab Emirates', lat: 23.4, lon: 53.8, peakSeasons: [11, 12, 1, 2, 3], touristType: 'Luxury, Shopping, Desert', owid: { workMinutes: 285, sleepMinutes: 470, leisureMinutes: 260, unpaidCare: { male: 60, female: 280 } } },
  '376': { id: '376', name: 'Israel', lat: 31.0, lon: 34.8, peakSeasons: [4, 5, 9, 10], touristType: 'Historical, Spiritual, Beaches', owid: { workMinutes: 230, sleepMinutes: 495, leisureMinutes: 285, unpaidCare: { male: 100, female: 260 } } },
};

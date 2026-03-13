export interface OWIDData {
  workMinutes: number;
  sleepMinutes: number;
  leisureMinutes: number;
  unpaidCare: {
    male: number;
    female: number;
  };
}

export interface CountryData {
  id: string; // ISO 3166-1 numeric code (matches TopoJSON id)
  name: string;
  lat: number;
  lon: number;
  peakSeasons: number[]; // 1-12 (Jan-Dec)
  touristType: string;
  owid: OWIDData;
}

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

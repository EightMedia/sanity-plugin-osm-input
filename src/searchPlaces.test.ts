import { describe, expect, it } from 'vitest';

import { photonFeatureToSuggestion } from './searchPlaces';

describe('photonFeatureToSuggestion', () => {
  it('maps a feature with name and city', () => {
    expect(
      photonFeatureToSuggestion(
        {
          geometry: { coordinates: [5.1214, 52.0907] },
          properties: {
            osm_id: 123,
            name: 'Domplein',
            city: 'Utrecht',
            country: 'Netherlands',
          },
        },
        0,
      ),
    ).toEqual({
      id: '123',
      label: 'Domplein, Utrecht, Netherlands',
      lat: 52.0907,
      lng: 5.1214,
    });
  });

  it('returns null without coordinates', () => {
    expect(
      photonFeatureToSuggestion(
        { properties: { name: 'Nowhere' } },
        0,
      ),
    ).toBeNull();
  });

  it('builds a street label when name is missing', () => {
    expect(
      photonFeatureToSuggestion(
        {
          geometry: { coordinates: [4.9, 52.37] },
          properties: {
            housenumber: '10',
            street: 'Damrak',
            city: 'Amsterdam',
          },
        },
        2,
      ),
    ).toEqual({
      id: 'photon-2-52.37-4.9',
      label: '10 Damrak, Amsterdam',
      lat: 52.37,
      lng: 4.9,
    });
  });
});

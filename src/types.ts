/** Sanity geopoint value stored on the document. */
export type GeopointValue = {
  _type: 'geopoint';
  lat: number;
  lng: number;
  alt?: number;
};

/** One hit from the place search API. */
export type PlaceSuggestion = {
  id: string;
  label: string;
  lat: number;
  lng: number;
};

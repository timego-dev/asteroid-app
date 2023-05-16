export interface INeo {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_max: number;
      estimated_diameter_min: number;
    };
  };
  is_sentry_object: boolean;
  is_potentially_hazardous_asteroid: boolean;
}

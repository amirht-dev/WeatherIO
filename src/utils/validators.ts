export function validateLocationQuery(
  location: string
): { success: true; data: string } | { success: false; error: string } {
  const matchesUrl = /^[a-z]+(-[a-z]+)*[a-z]+$/i.test(location);
  const matchesCoords =
    /^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?),-?([0-9]?[0-9](\.[0-9]+)?|1[0-7][0-9](\.[0-9]+)?|180(\.0+)?)$/i.test(
      location
    );

  if (matchesUrl || matchesCoords)
    return {
      success: true,
      data: location,
    };

  return {
    success: false,
    error:
      'location is invalid. use city-region-country or latitude,longitude formats',
  };
}

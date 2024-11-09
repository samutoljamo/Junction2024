/**
 * Transforms GPS coordinates (latitude and longitude) to normalized coordinates between 0 and 1.
 * If the GPS point is outside the defined area, the coordinates are clamped to the closest point within the range.
 *
 * @param lat - The latitude of the point to transform.
 * @param lon - The longitude of the point to transform.
 * @returns An object containing the normalized coordinates x and y.
 */
function gpsToNormalized(lat: number, lon: number): { x: number; y: number } {
  const top_left = { lat: 60.16241, lon: 24.905575 }; // Top-left corner
  const top_right = { lat: 60.16186, lon: 24.905884 }; // Top-right corner
  const bottom_right = { lat: 60.161362, lon: 24.902548 }; // Bottom-right corner
  const bottom_left = { lat: 60.161887, lon: 24.902215 }; // Bottom-left corner

  const y =
    Math.sqrt((lat - top_left.lat) ** 2 + (lon - top_left.lon) ** 2) /
    Math.sqrt(
      (bottom_left.lat - top_left.lat) ** 2 +
        (bottom_left.lon - top_left.lon) ** 2
    );
  const x =
    Math.sqrt((lat - top_left.lat) ** 2 + (lon - top_left.lon) ** 2) /
    Math.sqrt(
      (top_right.lat - top_left.lat) ** 2 + (top_right.lon - top_left.lon) ** 2
    );
  return { x, y };
}

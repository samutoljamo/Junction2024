/**
 * Transforms GPS coordinates (latitude and longitude) to normalized coordinates between 0 and 1.
 * If the GPS point is outside the defined area, the coordinates are clamped to the closest point within the range.
 *
 * @param lat - The latitude of the point to transform.
 * @param lon - The longitude of the point to transform.
 * @returns An object containing the normalized coordinates x and y.
 */ export function gpsToNormalized(
  lat: number,
  lon: number
): { x: number; y: number } {
  const topLeft = { lat: 60.16241, lon: 24.905575 };
  const topRight = { lat: 60.16186, lon: 24.905884 };
  const bottomRight = { lat: 60.161362, lon: 24.902548 };
  const bottomLeft = { lat: 60.161887, lon: 24.902215 };

  // Define vectors for the edges of the quadrilateral
  const leftVector = [
    bottomLeft.lat - topLeft.lat,
    bottomLeft.lon - topLeft.lon,
  ];
  const rightVector = [
    bottomRight.lat - topRight.lat,
    bottomRight.lon - topRight.lon,
  ];
  const topVector = [topRight.lat - topLeft.lat, topRight.lon - topLeft.lon];
  const bottomVector = [
    bottomRight.lat - bottomLeft.lat,
    bottomRight.lon - bottomLeft.lon,
  ];

  // Calculate position relative to top-left corner
  const gpsVector = [lat - topLeft.lat, lon - topLeft.lon];

  // Solve for u (horizontal) using top and bottom vectors
  const A_top = [
    [topVector[0], -leftVector[0]],
    [topVector[1], -leftVector[1]],
  ];
  const A_bottom = [
    [bottomVector[0], -rightVector[0]],
    [bottomVector[1], -rightVector[1]],
  ];

  const u_top = solveLeastSquares(A_top, gpsVector)[0];
  const u_bottom = solveLeastSquares(A_bottom, gpsVector)[0];
  let u = (u_top + u_bottom) / 2; // Average for best estimate

  // Solve for v (vertical) using left and right vectors
  const leftGps = u * leftVector[0] + u * leftVector[1];
  let v = dot(gpsVector, leftVector) / dot(leftVector, leftVector);

  // Clamp u and v to the range [0, 1]
  u = Math.max(0, Math.min(1, u));
  v = Math.max(0, Math.min(1, v));

  return { x: u, y: v };
}

// Helper function for dot product
function dot(v1: number[], v2: number[]): number {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

// Helper function for solving least squares (similar to np.linalg.lstsq)
function solveLeastSquares(A: number[][], b: number[]): number[] {
  const [a, b1] = A[0];
  const [c, d] = A[1];
  const det = a * d - b1 * c;
  if (Math.abs(det) < 1e-10) return [0, 0]; // Handle potential divide by zero
  const x = (d * b[0] - b1 * b[1]) / det;
  const y = (-c * b[0] + a * b[1]) / det;
  return [x, y];
}

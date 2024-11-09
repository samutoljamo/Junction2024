/**
 * Transforms GPS coordinates (latitude and longitude) to normalized coordinates between 0 and 1.
 * If the GPS point is outside the defined area, the coordinates are clamped to the closest point within the range.
 *
 * @param lat - The latitude of the point to transform.
 * @param lon - The longitude of the point to transform.
 * @returns An object containing the normalized coordinates x and y.
 */
export function gpsToNormalized(
  lat: number,
  lon: number
): { x: number; y: number } {
<<<<<<< HEAD
    const R = { y: lat, x: lon };
    const top_left = { y: 60.162410, x: 24.905575 } // Top-left corner
    const top_right = { y: 60.161860, x: 24.905884 } // Top-right corner
    const bottom_right = { y: 60.161362, x: 24.902548 } // Bottom-right corner
    const bottom_left = { y: 60.161887, x: 24.902215 }  // Bottom-left corner

    const projected_on_the_y = closestPointOnLine(top_left, bottom_left, R);
    const projected_on_the_x = closestPointOnLine(top_left, top_right, R);

    const y = Math.sqrt((projected_on_the_y.x - top_left.x) ** 2 + (projected_on_the_y.y - top_left.y) ** 2) / Math.sqrt((bottom_left.x - top_left.x) ** 2 + (bottom_left.y - top_left.y) ** 2);
    const x = Math.sqrt((projected_on_the_x.x - top_left.x) ** 2 + (projected_on_the_x.y - top_left.y) ** 2) / Math.sqrt((top_right.x - top_left.x) ** 2 + (top_right.y - top_left.y) ** 2);

    return { x, y };
}

interface Point {
    x: number;
    y: number;
}

function closestPointOnLine(P: Point, Q: Point, R: Point): Point {
    // Calculate vector PQ
    const PQ = { x: Q.x - P.x, y: Q.y - P.y };

    // Calculate vector PR
    const PR = { x: R.x - P.x, y: R.y - P.y };

    // Compute the dot products
    const dotProduct = PQ.x * PR.x + PQ.y * PR.y;
    const lengthSquared = PQ.x * PQ.x + PQ.y * PQ.y;

    // Compute the scalar projection t
    const t = dotProduct / lengthSquared;

    // Compute the closest point S = P + t * PQ
    const S = {
        x: P.x + t * PQ.x,
        y: P.y + t * PQ.y
    };

    return S;
}


=======
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
>>>>>>> f3eac7ee64ad9ba3c0714fe50165b08fda9c9537

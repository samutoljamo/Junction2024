/**
 * Transforms GPS coordinates (latitude and longitude) to normalized coordinates between 0 and 1.
 * If the GPS point is outside the defined area, the coordinates are clamped to the closest point within the range.
 *
 * @param lat - The latitude of the point to transform.
 * @param lon - The longitude of the point to transform.
 * @param latMin - The minimum latitude (corresponding to y = 0).
 * @param latMax - The maximum latitude (corresponding to y = 1).
 * @param lonMin - The minimum longitude (corresponding to x = 0).
 * @param lonMax - The maximum longitude (corresponding to x = 1).
 * @returns An object containing the normalized coordinates x and y.
 */
function gpsToNormalized(
    lat: number,
    lon: number,
    latMin: number,
    latMax: number,
    lonMin: number,
    lonMax: number
): { x: number; y: number } {
    // Check for zero denominators to avoid division by zero
    const latRange = latMax - latMin;
    const lonRange = lonMax - lonMin;

    if (latRange === 0 || lonRange === 0) {
        throw new Error("Latitude or longitude range cannot be zero.");
    }

    // Normalize latitude and longitude
    let x = (lon - lonMin) / lonRange;
    let y = (lat - latMin) / latRange;

    // Clamp x and y between 0 and 1
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    return { x, y };
}


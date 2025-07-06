// This is a Web Worker file that handles heavy animation calculations
// to keep the main thread free for UI rendering

// Define the types of messages this worker can receive
type WorkerMessage = {
  type: 'calculateStarPositions' | 'calculateBoxColors';
  payload: any;
};

// Handle messages from the main thread
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'calculateStarPositions':
      const starPositions = calculateStarPositions(
        payload.count,
        payload.width,
        payload.height,
        payload.seed || 42 // Use provided seed or default to 42
      );
      self.postMessage({ type: 'starPositionsResult', payload: starPositions });
      break;

    case 'calculateBoxColors':
      const boxColors = calculateBoxColors(
        payload.rows,
        payload.cols,
        payload.colors,
        payload.seed || 42 // Use provided seed or default to 42
      );
      self.postMessage({ type: 'boxColorsResult', payload: boxColors });
      break;

    default:
      console.warn('Unknown message type received in worker:', type);
  }
};

// Deterministic random number generator for consistent server/client rendering
function seededRandom(seed: number) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Calculate positions for stars in a space-efficient pattern
function calculateStarPositions(count: number, width: number, height: number, seed: number) {
  const positions = [];
  const random = seededRandom(seed);
  
  // Create a grid-like distribution with some randomness
  const gridCols = Math.ceil(Math.sqrt(count));
  const gridRows = Math.ceil(count / gridCols);
  
  const cellWidth = width / gridCols;
  const cellHeight = height / gridRows;
  
  let index = 0;
  
  for (let row = 0; row < gridRows && index < count; row++) {
    for (let col = 0; col < gridCols && index < count; col++) {
      // Add some randomness within each cell
      const x = col * cellWidth + random() * cellWidth;
      const y = row * cellHeight + random() * cellHeight;
      
      // Add some random size and delay values
      const size = random() * 2 + 1;
      const delay = random() * 5;
      const glowChance = random() > 0.8;
      
      positions.push({ x, y, size, delay, glowChance });
      index++;
    }
  }
  
  return positions;
}

// Pre-calculate random colors for boxes
function calculateBoxColors(rows: number, cols: number, colors: string[], seed: number) {
  const colorMap: string[][] = [];
  const random = seededRandom(seed);
  
  for (let i = 0; i < rows; i++) {
    colorMap[i] = [];
    for (let j = 0; j < cols; j++) {
      const colorIndex = Math.floor(random() * colors.length);
      colorMap[i][j] = colors[colorIndex];
    }
  }
  
  return colorMap;
}

// Export empty type for TypeScript
export {}; 
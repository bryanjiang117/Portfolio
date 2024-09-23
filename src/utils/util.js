export const getNameMetrics = (name) => {
  // Align text ref https://darraghmckay.com/blog/rect-text
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const windowWidth = window.innerWidth
  const fontSize = windowWidth * 0.11; // 11vw equivalent
  context.font = `${fontSize}px Arial`;
  const metrics = context.measureText(name);
  const length = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const leftSidePadding = Math.abs(metrics.actualBoundingBoxLeft); 	
  const rightSidePadding = Math.abs(metrics.actualBoundingBoxRight - metrics.width) / 2;
  const left = (windowWidth - length) / 2 + leftSidePadding;
  const right = left + length - rightSidePadding;

  return {
    length: length,
    leftSidePadding: leftSidePadding,
    rightSidePadding: rightSidePadding,
    left: left,
    right: right,
  }
}
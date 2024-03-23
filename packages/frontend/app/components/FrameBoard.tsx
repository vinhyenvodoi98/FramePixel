export default function FrameBoard() {
  const generateGridCells = () => {
    const gridRows = 50;
    const gridCols = 50;
    const gridCells = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cellColor = "bg-red"
        // const cellColor = gridColors[row][col];
        gridCells.push(
          <div
            key={`${row}-${col}`}
            tw={`bg-white h-2 w-2 ${cellColor}-300`}
          ></div>
        );
      }
    }

    return gridCells;
  };

  return (
    <div tw='flex items-center flex-col'>
      <div tw='flex flex-wrap w-[432px] p-4 rounded-3xl'>{generateGridCells()}</div>
    </div>
  );
}
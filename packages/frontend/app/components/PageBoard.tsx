'use client'
import Board from './Board';
import { useMemo, useRef, useState } from "react";

export default function PageBoard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // const { data: grid, refetch } = useContractReads({
  //   contracts: rowIds.map((id) => ({
  //     address: superPlaceAddress.address as `0x${string}`,
  //     abi: superPlaceAbi.abi as any,
  //     functionName: 'getCanvas',
  //     args: [id as any],
  //     chainId: 420, // only call from op-goerli
  //   })),
  //   cacheTime: 10_000,
  //   staleTime: 10_000,
  // });

  const gridColors: any = useMemo(() => {
    return Array.from({ length: 100 }, () => new Array(100).fill('white'));
  }, []);

  const handleMouseDown = (e: any) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: any) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: any) => {
    e.preventDefault();
    const newScale = Math.max(0.1, Math.min(scale + e.deltaY * -0.001, 3));
    setScale(newScale);
  };

  return(
    <div
      className='relative bg-base-100 h-[600px] flex justify-center items-center'
      // style={{
      //   transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      // }}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      {gridColors && (
        <Board
          ref={canvasRef}
          gridColors={gridColors}
          setCoordinates={setCoordinates}
        />
      )}
    </div>
  )
}
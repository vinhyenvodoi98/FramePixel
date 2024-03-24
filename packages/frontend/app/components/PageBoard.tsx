'use client'
import Board from './Board';
import { useMemo, useRef, useState, useEffect } from "react";
import Palette from './Palette';
import Header from './Header';
import Providers from './Provider';
import { useContractReads, usePrepareContractWrite, useAccount, useContractWrite } from 'wagmi';

import contractAddress from '../../../contracts/contract-address.json'
import contractAbi from '../../../contracts/artifacts/contracts/Board.sol/Board.json'

const colorOptions = {
  red: '#FF0000',
  yellow: '#FFFF00',
  blue: '#0000FF',
}

export default function PageBoard() {
  return(
    <Providers>
      <Header />
      <Body/>
    </Providers>
  )
}

const Body = () => {
  const [selectedColor, setSelectedColor]=useState<string>("#FF0000")
  const canvasRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const rowIds = Array.from({ length: 50 }, (_, index) => index);
  const { address } = useAccount()

  const { data: grid, refetch } = useContractReads({
    contracts: rowIds.map((id) => ({
      address: contractAddress["84532"].address as `0x${string}`,
      abi: contractAbi.abi as any,
      functionName: 'getBoard',
      args: [id as any],
      chainId: 420, // only call from op-goerli
    })),
    cacheTime: 10_000,
    staleTime: 10_000,
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    refetch?.()

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      refetch?.()
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const gridColors:any = useMemo(() => {
    return grid ?
      grid.map((obj:any) => obj.result?.map((value:string) => value === "" ? "white" : value))
      : Array.from({ length: 100 }, () => new Array(50).fill('white'));
  }, [grid]);


  const { config } = usePrepareContractWrite({
		address: contractAddress["84532"].address as `0x${string}`,
		abi: contractAbi.abi,
		functionName: 'place',
		args: [{
			user: address,
      x: coordinates.x, //x
      y: coordinates.y, //y
      color: selectedColor  //color
    }] as any,
	})

	const { write, isLoading, isSuccess } = useContractWrite(config)

  return (
    <div
        className='relative bg-base-100 h-[600px] flex flex-col gap-4 justify-center items-center'
      >
        {gridColors && (
          <Board
            ref={canvasRef}
            gridColors={gridColors}
            setCoordinates={setCoordinates}
          />
        )}

        <Palette
          colorOptions={colorOptions}
          coordinates={coordinates}
          setSelectedColor={setSelectedColor}
          placePixel={write}
          selectedColor={selectedColor}
        />
      </div>
  )
}

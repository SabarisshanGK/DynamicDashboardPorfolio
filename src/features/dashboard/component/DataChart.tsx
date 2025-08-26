"use client"

import { useState } from "react";

interface StockHistory {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

interface StockData {
  symbol: string;
  chartData: StockHistory[];
}

interface DataChartProps{
    sector: string;
};

export const DataChart = ({ sector }: DataChartProps) => {

    const [ stocks , setStocks] = useState<StockData[]>([])

    return(
        <div>
            {sector}
        </div>
    )
}
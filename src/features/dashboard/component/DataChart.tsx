"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CustomLineChart } from "./CustomLineChart";

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

    // fetch data and store it in stocks in regular interval of 15 sechonds and it will refetch when sector changes
    useEffect(()=>{
        const fecthChartDatas = async() => {
            try{
              const response = await axios.get(`/api/charts/${sector}`)
              setStocks(response.data);
            }catch(error){
              if(axios.isAxiosError(error)){
                  if(error.response?.status === 400){
                    toast.error("Failed to fetch chart datas")
                  }
              }else{
                toast.error("Unexpected error occured");
              }
            }

        }

        // initial fetch
        if(sector){
          fecthChartDatas();
        }

        // Fetch every 15 secs
        const interval = setInterval(fecthChartDatas, 15000); 

        return () => clearInterval(interval);
    },[sector]);

    return(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {
          stocks.map((stock) => {
            const latestPrice = stock.chartData[stock.chartData.length - 1]?.close;
            const prevPrice = stock.chartData[stock.chartData.length - 2]?.close || latestPrice;

            return (
              <div key={stock.symbol} className="p-4 bg-white rounded-md border border-[#EDEDED] border-solid">
                <h3 className="text-md font-semibold mb-6 font-readex">
                  {stock.symbol} CMP:{" "}
                  <motion.span
                    key={latestPrice}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`ml-2 font-readex tracking-wider ${latestPrice > prevPrice ? "text-green-500" : "text-red-500"}`}
                  >
                    {latestPrice?.toFixed(2)}
                  </motion.span>
                </h3>

                <CustomLineChart data={stock.chartData}/>
              </div>
            );
          })
        }
      </div>
    )
}
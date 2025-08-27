"use client"

import { Stock } from "@/lib/types";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import  {Column, useTable}  from 'react-table';
import { toast } from "sonner";

interface StockTableProps{
    sector: string;
};

export const Stocktable = ( { sector } : StockTableProps ) => {

    const [ datas , setDatas ] = useState([]);

    // Fetch data every 15 seconds
    useEffect(()=> {

        // initial fetch
        const fetchStockDatas = async()=>{
          try{
              const response = await axios.get(`/api/stock/${sector}`)
              setDatas(response.data);
          }catch(error){
            if(axios.isAxiosError(error)){
                if(error.response?.status === 400){
                    toast.error("Failed to fetch stocks")
                }
            }else{
                toast.error("Unexpected error happened")
            }
          }
        }

       if(sector){
         fetchStockDatas();
       }

        // This is interval which executes fetchStockData function every 15 seconds
        const interval = setInterval(fetchStockDatas,15000);

        return ()=> clearInterval(interval);

    },[sector]);


    // Data for react-table
    const data = useMemo<Stock[]>(()=>datas,[datas])

    //  Coilumns for our table
    const columns = useMemo<Column<Stock>[]>(()=>
        [
        {
            Header: "Name",
            accessor: "particulars",
             Cell: ({ value }) => (
                <div className="w-full truncate text-left">{value || ""}</div> 
            ),
        },
        {
            Header: "Quantity",
            accessor: "quantity"
        },
        {
            Header: "Purchase Price",
            accessor: "purchasePrice",
        },
        {
            Header: "Investment",
            accessor: "investment",
        },
        {
            Header: "Exchange",
            accessor: "exchange",
            Cell: props => <span className={`text-center ${props.value === "NSE"?"text-[#007DFC]":"text-[#EFB745]"}`}>{props.value|| ""}</span>
        },
        {
            Header: "Portfolio Percentage",
            accessor: "portfolioWeight",
            Cell: props => <span>{props.value || 0} %</span>
        },
        {
            Header: "Gain/Loss %",
            accessor: "gainLossPercent",
            Cell: props => {
                const value = props.value || 0;
                return(
                    <span className={`flex gap-2  justify-between pl-3 rounded-md w-[100px] h-max items-center p-2 ${value > 0? "bg-[#1ECB44]/10":"bg-[#FF0000]/10"} font-readex ${value > 0 ? "text-[#1ECB44]":"text-[#FF0000]"} `}>{props.value?.toFixed(2)} {value > 0 ? <BiUpArrow/> :<BiDownArrow/>}</span>
                )
            }
        },
         {
            Header: "CMP",
            accessor: (row: Stock) => row.yahooFinance?.price ?? 0,
            Cell: props => {
                const value = props.value || 0;
                return(
                    <motion.span key={value} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>{value}</motion.span>
                )
            }
        },
         {
            Header: "Present Value",
            accessor: "presentValue",
            Cell: props => {
                const value = props.value || 0;
                return(
                    <span>{value?.toFixed(1)}</span>
                )
            }
        },
         {
            Header: "Gain/loss",
            accessor: "gainLoss",
            Cell: props => <span>{props.value?.toFixed(1)}</span>
        },
         {
            Header: "Market Cap",
            accessor: (row: Stock)=>row.yahooFinance?.marketCap ?? 0,
        },
         {
            Header: "P/E",
            accessor: (row: Stock)=>row.yahooFinance?.peRatio ?? 0,
            Cell: props => <span>{props.value.toFixed(1)}</span>
        },
        // {
        //     Header: "Revenue",
        //     accessor: "revenue",
        // },
        {
            Header: "Book Value",
            accessor: "bookValue",
        },
        {
            Header: "Price to book",
            accessor: "priceToBook",
        },
        {
            Header: "CFO",
            accessor: "cfo",
        },
        ]
    ,[]);

    const {  getTableProps,getTableBodyProps,headerGroups, rows, prepareRow  } = useTable({columns,data});

    return(
       <div className="w-full h-max overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y  divide-gray-200 border border-gray-300 rounded-lg px- bg-white">
                <thead>
                    {
                        headerGroups.map((headerGroup,index)=>(
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                    {
                                        headerGroup.headers.map((column,indexs)=>(
                                            <th  {...column.getHeaderProps()} key={indexs} className="px-4 py-2 text-left text-sm font-medium text-black font-readex uppercase tracking-wider">
                                                {column.render("Header")}
                                            </th>
                                        ))
                                    }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {
                        rows.map((row,index)=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()} key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                    {
                                        row.cells.map((cell,index)=>(
                                            <td {...cell.getCellProps()} key={index}  className="px-3 py-2 text-sm text-gray-700 text-center">{cell.render("Cell")}</td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
       </div>
    )
}
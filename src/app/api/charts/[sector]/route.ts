import { stockSectorList } from "@/lib/datas";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextRequest,{params}: {params: { sector: string}}){
    try {
        const { sector } = params;

        const filterdeStocks = stockSectorList.filter((item)=> item.sector === sector);
        const today = new Date();
        const past = new Date();
        past.setMonth(today.getMonth() - 1);

        const results = await Promise.all(
            filterdeStocks.map(async(stock)=>{
                //  Fetching chart data for period of 1 days
                const chartDatas = await yahooFinance.historical(stock.symbol,{
                    period1: past.toISOString().split("T")[0],
                    period2: new Date().toISOString().split("T")[0],
                    interval: "1d",
                });

                return {
                    symbol: stock.symbol,
                    chartData: chartDatas.map((item)=>({
                        date: new Date(item.date).toLocaleDateString(),
                        close: item.close,
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        volume: item.volume,
                    })) 
                }

            })
        )

        return NextResponse.json(results)

    } catch (err) {
         return NextResponse.json({error: err},{status:400})  
    }
}
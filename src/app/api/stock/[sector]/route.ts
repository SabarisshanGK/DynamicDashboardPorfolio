import { stockSectorList } from "@/lib/datas";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextRequest,{params}: {params: { sector: string}}) {
    const { sector } = params;
    try{
        const filteredStockList = stockSectorList.filter((item)=> item.sector === sector)
        const stockExchange =  await Promise.all(
            filteredStockList.map(async(stock)=>{
                const yahooResponse = await yahooFinance.quote(stock.symbol)   
                
                const summary = await yahooFinance.quoteSummary(stock.symbol, {
                    modules: ["financialData", "defaultKeyStatistics", "summaryDetail"],
                });

                const cmp = yahooResponse?.regularMarketPrice || 0;
                const investment = stock.purchasePrice * stock.quantity;
                const presentValue = cmp * stock.quantity;
                const gainLoss = presentValue - investment;
                const gainLossPercent = investment ? (gainLoss / investment) * 100 : 0;

                return {
                    ...stock,
                    yahooFinance: {
                        price: cmp,
                        changePercent: yahooResponse.regularMarketChangePercent || 0,
                        marketCap: yahooResponse?.marketCap || undefined,
                        peRatio: yahooResponse?.trailingPE || undefined,
                    },
                    investment,
                    presentValue,
                    gainLoss,
                    gainLossPercent,
                    revenue: summary?.financialData?.totalRevenue || "N/A",
                    ebitda: summary?.financialData?.ebitda || "N/A",
                    cfo: summary?.financialData?.operatingCashflow || "N/A",
                    freeCashFlow: summary?.financialData?.freeCashflow || "N/A",
                    debtToEquity: summary?.financialData?.debtToEquity || "N/A",
                    bookValue: summary?.defaultKeyStatistics?.bookValue || "N/A",
                    priceToSales: summary?.summaryDetail?.priceToSalesTrailing12Months || "N/A",
                    priceToBook: summary?.defaultKeyStatistics?.priceToBook|| "N/A",
                };
            })
        );
         const totalInvestment = stockExchange.reduce(
            (sum, stock) => sum + (stock.investment || 0),
            0
        );

        const result = stockExchange.map((stock) => ({
            ...stock,
            totalInvestment : totalInvestment,
            portfolioWeight: totalInvestment
                ? Number(((stock.investment! / totalInvestment) * 100).toFixed(2))
                : 0,
            }),
        );
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err},{status: 400})
    }
}
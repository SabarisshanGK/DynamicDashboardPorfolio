import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface StockHistory {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

interface CustomLineChartProps{
    data: StockHistory[];
}

export const CustomLineChart = ( { data }: CustomLineChartProps ) => {
    return(
         <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="close" stroke="#007DFC" strokeWidth={2} dot={false} />
            </LineChart>
         </ResponsiveContainer>
    )
}
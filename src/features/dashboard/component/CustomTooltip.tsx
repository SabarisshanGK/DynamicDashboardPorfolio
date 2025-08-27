import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // full chartData row
    return (
      <div className="bg-white p-3 rounded-lg font-readex border border-black flex flex-col gap-1">
        <p className="font-bold">{label}</p>
        <p>Open: {data.open.toFixed(2)}</p>
        <p>High: {data.high.toFixed(2)}</p>
        <p>Low: {data.low.toFixed(2)}</p>
        <p>Close: {data.close.toFixed(2)}</p>
        <p>Volume: {data.volume.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};
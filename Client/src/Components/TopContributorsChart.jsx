import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function TopContributorsChart({ data = [] }) {
  return (
    <div className="group bg-[#161c2a] rounded-xl p-6 w-full h-87.5 flex flex-col font-['Inter'] shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between mb-6 h-8">
        <h2 className="text-white text-base font-semibold">
          Workshops por Colaborador{" "}
          <span className="text-[#7a88a4] text-sm font-normal">(top 5)</span>
        </h2>

        <Link
          to="/colaboradores"
          className="opacity-0 group-hover:opacity-100 bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-300"
        >
          Ver colaboradores
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#252f45"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7a88a4", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7a88a4", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#1a2540" }}
              contentStyle={{
                backgroundColor: "#0b0f19",
                borderColor: "#252f45",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#4d8aff" }}
            />
            <Bar
              dataKey="workshops"
              fill="#5c6dff"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

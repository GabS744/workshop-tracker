import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WorkshopsDistributionChart() {
  const data = [
    { name: "Clean Code com C#", value: 6, percentage: 21 },
    { name: "Introdução ao Docker", value: 5, percentage: 18 },
    { name: "React 19 e Server Comp...", value: 5, percentage: 18 },
    { name: "Segurança em APIs REST", value: 8, percentage: 29 },
    { name: "Testes Automatizados c...", value: 4, percentage: 14 },
  ];

  const COLORS = ["#5112e8", "#4045ff", "#6485ff", "#9caaff", "#3b12a8"];

  return (
    <div className="group bg-[#161c2a] rounded-xl p-6 w-full h-87.5 flex flex-col font-['Inter'] shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between mb-6 h-8">
        <h2 className="text-white text-base font-semibold">
          Colaboradores por Workshop
        </h2>

        <Link
          to="/workshops"
          className="opacity-0 group-hover:opacity-100 bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-300"
        >
          Ver Workshops
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div className="relative w-1/2 h-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0f19",
                  borderColor: "#252f45",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[#7a88a4] text-xs">Total</span>
            <span className="text-white text-xl font-bold">28</span>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-3 justify-center pl-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span
                  className="text-[#7a88a4] text-sm truncate max-w-30"
                  title={item.name}
                >
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-white font-semibold">{item.value}</span>
                <span className="text-[#7a88a4]">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

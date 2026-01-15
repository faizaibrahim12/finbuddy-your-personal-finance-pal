import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, categoryConfig } from '@/types/finance';

interface ExpenseChartProps {
  data: { category: Category; amount: number }[];
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const chartData = data.map(item => ({
    name: categoryConfig[item.category].label,
    value: item.amount,
    color: categoryConfig[item.category].color,
    icon: categoryConfig[item.category].icon,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-48 h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-sm font-medium">{data.name}</p>
                      <p className="text-sm text-muted-foreground">${data.value.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">${total.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

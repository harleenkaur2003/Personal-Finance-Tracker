'use client'

import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Transaction = {
  _id: string
  title: string
  amount: number
  category: string
  date: string
}

interface Props {
  transactions: Transaction[]
}

const CATEGORY_COLORS: { [key: string]: string } = {
  Food: '#f87171',
  Transport: '#60a5fa',
  Shopping: '#a78bfa',
  Health: '#34d399',
  Utilities: '#facc15',
  Other: '#c084fc',
}

export default function CategoryPieChart({ transactions }: Props) {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const totals: { [key: string]: number } = {}
    transactions.forEach((t) => {
      const cat = t.category || 'Other'
      totals[cat] = (totals[cat] || 0) + t.amount
    })

    const chartData = Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }))
    setData(chartData)
  }, [transactions])

  return (
    <div>
      <h2 className="section-title">Expenses by Category</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry) => (
  <Cell
    key={entry.name}
    fill={CATEGORY_COLORS[entry.name] || '#d1d5db'}
  />
))}


            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

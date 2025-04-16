'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type Transaction = {
  _id: string
  title: string
  amount: number
  date: string
}

type ChartData = {
  month: string
  total: number
}

interface Props {
  transactions: Transaction[]
}

export default function ExpenseChart({ transactions }: Props) {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    const monthlyTotals: { [key: number]: number } = {}

    transactions.forEach((t) => {
      const month = new Date(t.date).getMonth()
      monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount
    })

    const chartData: ChartData[] = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      total: monthlyTotals[i] || 0,
    }))

    setData(chartData)
  }, [transactions])

  return (
    <div>
      <h2 className="section-title">Monthly Expenses</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

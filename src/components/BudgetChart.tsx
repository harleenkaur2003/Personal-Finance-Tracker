'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Transaction = {
  amount: number
  category: string
}

type Budget = {
  category: string
  amount: number
}

interface Props {
  transactions: Transaction[]
}

export default function BudgetChart({ transactions }: Props) {
  const [budgets, setBudgets] = useState<Budget[]>([])

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await fetch('/api/budgets')
      const data = await res.json()
      setBudgets(data)
    }
    fetchBudgets()
  }, [])

  const categoryTotals: { [category: string]: number } = {}
  transactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })

  const chartData = budgets.map((b) => ({
    category: b.category,
    budget: b.amount,
    spent: categoryTotals[b.category] || 0,
  }))

  return (
    <div>
      <h2 className="section-title">Budget vs Actual</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#60a5fa" />
            <Bar dataKey="spent" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

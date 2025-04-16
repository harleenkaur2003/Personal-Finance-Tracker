'use client'

import { useEffect, useState } from 'react'

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

export default function BudgetInsights({ transactions }: Props) {
  const [budgets, setBudgets] = useState<Budget[]>([])

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await fetch('/api/budgets')
      const data = await res.json()
      setBudgets(data)
    }
    fetchBudgets()
  }, [])

  const insights = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0)

    const remaining = b.amount - spent
    const status = remaining < 0 ? 'Over budget' : 'Within budget'

    return { ...b, spent, remaining, status }
  })

  return (
    <div>
      <h2 className="section-title">Budget Insights</h2>
      <ul className="insight-list">
        {insights.map((i) => (
          <li key={i.category} className="insight-item">
            <strong>{i.category}:</strong> ₹{i.spent} spent / ₹{i.amount} budget →{' '}
            <span className={i.remaining < 0 ? 'over' : 'ok'}>
              {i.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

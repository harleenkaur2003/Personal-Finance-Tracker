'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

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

export default function SummaryCards({ transactions }: Props) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0)

  const categorySummary: { [category: string]: number } = {}
  transactions.forEach((t) => {
    const cat = t.category || 'Other'
    categorySummary[cat] = (categorySummary[cat] || 0) + t.amount
  })

  const recentTransactions = transactions.slice(0, 3)

  return (
    <div className="summary-cards">
      <Card className="summary-card">
        <CardContent>
          <p>Total Expense</p>
          <h3>₹{total.toFixed(2)}</h3>
        </CardContent>
      </Card>

      <Card className="summary-card">
        <CardContent>
          <p>Top Categories</p>
          <ul>
            {Object.entries(categorySummary)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([cat, amt]) => (
                <li key={cat}>
                  {cat}: ₹{amt.toFixed(2)}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="summary-card">
        <CardContent>
          <p>Recent Transactions</p>
          <ul>
            {recentTransactions.map((t) => (
              <li key={t._id}>
                {t.title}: ₹{t.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import ExpenseChart from '@/components/ExpenseChart'
import CategoryPieChart from '@/components/CategoryPieChart'
import SummaryCards from '@/components/SummaryCards'
import BudgetForm from '@/components/BudgetForm'
import BudgetChart from '@/components/BudgetChart'
import BudgetInsights from '@/components/BudgetInsights'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions')
      const data = await res.json()
      setTransactions(data)
    }

    fetchData()
  }, [refreshKey])

  return (
    <main className="main">
      <h1>Personal Finance Tracker</h1>

      <div className="grid grid-2">
        <div className="card">
          <TransactionForm onAdd={() => setRefreshKey((prev) => prev + 1)} />
        </div>
        <div className="card">
          <SummaryCards transactions={transactions} />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <BudgetForm onSave={() => setRefreshKey((prev) => prev + 1)} />
        </div>
        <div className="card">
          <BudgetInsights transactions={transactions} />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <BudgetChart transactions={transactions} />
        </div>
        <div className="card">
          <ExpenseChart transactions={transactions} />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <CategoryPieChart transactions={transactions} />
        </div>
        <TransactionList
        transactions={transactions}
  onDelete={async (id) => {
    await fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setRefreshKey((prev) => prev + 1) // force reload
  }}
/>

      </div>
    </main>
  )
}

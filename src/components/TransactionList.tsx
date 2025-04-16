'use client'

import { Button } from '@/components/ui/button'

type Transaction = {
  _id: string
  title: string
  amount: number
  date: string
}

interface Props {
  transactions: Transaction[]
  onDelete?: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="transaction-list">
      <h2 className="section-title">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="transaction-items">
          {transactions.map((t) => (
            <li key={t._id} className="transaction-item">
              <div>
                <p className="transaction-title">{t.title}</p>
                <p className="transaction-amount">₹{t.amount}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(t._id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

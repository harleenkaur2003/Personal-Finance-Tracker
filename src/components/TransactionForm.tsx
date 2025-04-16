'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface Props {
  onAdd: () => void
}

const categories = [
  'Food', 'Transport', 'Shopping', 'Health', 'Utilities', 'Other',
]

export default function TransactionForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !amount || !category) {
      setError('All fields are required.')
      return
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount)) {
      setError('Amount must be a number.')
      return
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount: parsedAmount, category }),
      })

      if (!res.ok) throw new Error()

      setTitle('')
      setAmount('')
      setCategory('')
      setError('')
      onAdd()
    } catch {
      setError('Failed to add transaction.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g. Grocery"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="e.g. 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <Label htmlFor="category">Category</Label>
        <div className="dropdown-container">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="select-content-fixed">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div style={{ marginTop: '2rem' }}>
        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </div>
    </form>
  )
}

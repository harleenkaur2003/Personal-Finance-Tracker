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
import { categories } from '@/constants/categories'

interface Props {
  onSave: () => void
}

export default function BudgetForm({ onSave }: Props) {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !amount) {
      setError('All fields required.')
      return
    }

    const currentMonth = new Date().toISOString().slice(0, 7) // e.g. "2025-04"

    try {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          amount: parseFloat(amount),
          month: currentMonth,
        }),
      })

      if (!res.ok) throw new Error()
      setCategory('')
      setAmount('')
      setError('')
      onSave()
    } catch {
      setError('Failed to save budget.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
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

      <div className="form-group">
        <Label htmlFor="amount">Budget Amount</Label>
        <Input
          type="number"
          id="amount"
          placeholder="e.g. 2000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div style={{ marginTop: '1.5rem' }}>
        <Button type="submit" className="w-full">
          Save Budget
        </Button>
      </div>
    </form>
  )
}

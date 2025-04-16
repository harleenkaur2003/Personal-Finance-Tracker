import { connectDB } from '@/lib/db'
import { Transaction } from '@/models/Transaction'
import { NextResponse } from 'next/server'

// ✅ GET all transactions
export async function GET() {
  try {
    await connectDB()
    const transactions = await Transaction.find().sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('GET /api/transactions error:', error)
    return new NextResponse('Failed to fetch transactions', { status: 500 })
  }
}

// ✅ POST a new transaction
export async function POST(req: Request) {
  try {
    const { title, amount, category } = await req.json()

    if (!title || typeof amount !== 'number' || !category) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    await connectDB()
    const transaction = await Transaction.create({ title, amount, category })
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('POST /api/transactions error:', error)
    return new NextResponse('Failed to add transaction', { status: 500 })
  }
}

// ✅ DELETE a transaction by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return new NextResponse('Transaction ID is required', { status: 400 })
    }

    await connectDB()
    await Transaction.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Transaction deleted' })
  } catch (error) {
    console.error('DELETE /api/transactions error:', error)
    return new NextResponse('Failed to delete transaction', { status: 500 })
  }
}

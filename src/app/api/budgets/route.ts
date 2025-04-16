import { connectDB } from '@/lib/db'
import { Budget } from '@/models/Budget'
import { NextResponse } from 'next/server'

// ✅ GET all budgets or by month
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const month = searchParams.get('month') // e.g., "2025-04"

    const query = month ? { month } : {}
    const budgets = await Budget.find(query).sort({ category: 1 })

    return NextResponse.json(budgets)
  } catch (error) {
    console.error('GET /api/budgets error:', error)
    return new NextResponse('Failed to fetch budgets', { status: 500 })
  }
}

// ✅ POST: Add or update a budget
export async function POST(req: Request) {
  try {
    const { category, amount, month } = await req.json()

    if (!category || typeof amount !== 'number' || !month) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    await connectDB()

    // Update if exists, else create
    const updated = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { upsert: true, new: true }
    )

    return NextResponse.json(updated)
  } catch (error) {
    console.error('POST /api/budgets error:', error)
    return new NextResponse('Failed to save budget', { status: 500 })
  }
}

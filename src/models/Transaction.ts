import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: { 
        type: String, 
        required: true 
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)

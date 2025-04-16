import mongoose from 'mongoose'

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String, // Format: "YYYY-MM"
      required: true,
    },
  },
  { timestamps: true }
)

export const Budget =
  mongoose.models.Budget || mongoose.model('Budget', BudgetSchema)

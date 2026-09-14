import React from 'react';
import { formatCurrency } from '../../utils/currencyHelpers';
import { formatDateShort } from '../../utils/dateHelpers';

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="text-sm text-ink-faint italic py-8 text-center">No expenses logged yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b-2 border-cream-deep">
            <th className="py-3 pr-4 font-bold text-ink-soft">Date</th>
            <th className="py-3 pr-4 font-bold text-ink-soft">Description</th>
            <th className="py-3 pr-4 font-bold text-ink-soft">Category</th>
            <th className="py-3 pr-4 font-bold text-ink-soft text-right">Amount</th>
            <th className="py-3 pl-4 w-16" />
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-b border-cream-deep group hover:bg-cream-deep/40">
              <td className="py-3.5 pr-4 data-mono">{formatDateShort(e.expenseDate)}</td>
              <td className="py-3.5 pr-4 text-ink font-medium">{e.description}</td>
              <td className="py-3.5 pr-4">
                <span className="badge-coral">{e.category.toLowerCase()}</span>
              </td>
              <td className="py-3.5 pr-4 data-mono text-ink font-bold text-right">{formatCurrency(e.amount, e.currency)}</td>
              <td className="py-3.5 pl-4">
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                  <button onClick={() => onEdit(e)} className="text-xs font-bold text-coral hover:underline">
                    Edit
                  </button>
                  <span className="text-ink-faint">·</span>
                  <button onClick={() => onDelete(e)} className="text-xs font-bold text-coral-deep hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
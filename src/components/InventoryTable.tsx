import { Search, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', quantity: 145, minStock: 50, price: 79.99, status: 'in-stock' },
  { id: '2', name: 'Running Shoes', sku: 'RS-024', category: 'Footwear', quantity: 32, minStock: 30, price: 89.99, status: 'low-stock' },
  { id: '3', name: 'Coffee Maker', sku: 'CM-156', category: 'Appliances', quantity: 78, minStock: 20, price: 129.99, status: 'in-stock' },
  { id: '4', name: 'Yoga Mat', sku: 'YM-089', category: 'Fitness', quantity: 15, minStock: 25, price: 34.99, status: 'low-stock' },
  { id: '5', name: 'Water Bottle', sku: 'WB-203', category: 'Accessories', quantity: 203, minStock: 100, price: 19.99, status: 'in-stock' },
  { id: '6', name: 'Desk Lamp', sku: 'DL-412', category: 'Furniture', quantity: 0, minStock: 15, price: 45.99, status: 'out-of-stock' },
  { id: '7', name: 'Backpack', sku: 'BP-567', category: 'Bags', quantity: 67, minStock: 40, price: 59.99, status: 'in-stock' },
  { id: '8', name: 'Phone Case', sku: 'PC-891', category: 'Electronics', quantity: 8, minStock: 50, price: 24.99, status: 'low-stock' },
];

export default function InventoryTable() {
  const getStatusBadge = (status: string) => {
    const classes = {
      'in-stock': 'bg-green-100 text-green-700 border-green-200',
      'low-stock': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'out-of-stock': 'bg-red-100 text-red-700 border-red-200'
    };

    const labels = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock',
      'out-of-stock': 'Out of Stock'
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${classes[status as keyof typeof classes]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Current Inventory</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockInventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{item.name}</span>
                    {item.quantity < item.minStock && item.quantity > 0 && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${item.quantity === 0 ? 'text-red-600' : item.quantity < item.minStock ? 'text-yellow-600' : 'text-slate-900'}`}>
                    {item.quantity}
                  </span>
                  <span className="text-slate-400 text-sm ml-1">/ {item.minStock}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">${item.price}</td>
                <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

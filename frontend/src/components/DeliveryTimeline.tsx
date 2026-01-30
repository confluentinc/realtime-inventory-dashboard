import { Truck, Package, Clock, CheckCircle2 } from 'lucide-react';

interface Delivery {
  id: string;
  supplier: string;
  items: number;
  status: 'in-transit' | 'arriving-today' | 'processing' | 'delivered';
  eta: string;
  trackingNumber: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    supplier: 'TechSupply Co.',
    items: 150,
    status: 'arriving-today',
    eta: 'Today, 2:00 PM',
    trackingNumber: 'TS-2024-001'
  },
  {
    id: '2',
    supplier: 'Global Imports',
    items: 85,
    status: 'arriving-today',
    eta: 'Today, 4:30 PM',
    trackingNumber: 'GI-2024-048'
  },
  {
    id: '3',
    supplier: 'Premier Wholesale',
    items: 200,
    status: 'in-transit',
    eta: 'Tomorrow, 10:00 AM',
    trackingNumber: 'PW-2024-123'
  },
  {
    id: '4',
    supplier: 'FastTrack Distributors',
    items: 120,
    status: 'in-transit',
    eta: 'Dec 5, 9:00 AM',
    trackingNumber: 'FT-2024-567'
  },
  {
    id: '5',
    supplier: 'Urban Suppliers',
    items: 95,
    status: 'processing',
    eta: 'Dec 6, 1:00 PM',
    trackingNumber: 'US-2024-234'
  },
  {
    id: '6',
    supplier: 'Metro Goods',
    items: 175,
    status: 'in-transit',
    eta: 'Dec 7, 11:00 AM',
    trackingNumber: 'MG-2024-789'
  }
];

export default function DeliveryTimeline() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'arriving-today':
        return <Truck className="w-5 h-5 text-green-600" />;
      case 'in-transit':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-yellow-600" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Package className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'arriving-today':
        return 'bg-green-50 border-green-200';
      case 'in-transit':
        return 'bg-blue-50 border-blue-200';
      case 'processing':
        return 'bg-yellow-50 border-yellow-200';
      case 'delivered':
        return 'bg-slate-50 border-slate-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Incoming Deliveries</h2>
        <p className="text-sm text-slate-600">Track shipments in real-time</p>
      </div>

      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {mockDeliveries.map((delivery, index) => (
          <div
            key={delivery.id}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(delivery.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getStatusIcon(delivery.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900 text-sm">{delivery.supplier}</h3>
                  <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
                    {delivery.items} items
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Tracking: <span className="font-mono font-medium">{delivery.trackingNumber}</span>
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">{delivery.eta}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white border border-current font-medium">
                    {getStatusLabel(delivery.status)}
                  </span>
                </div>
              </div>
            </div>

            {delivery.status === 'arriving-today' && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <div className="w-full bg-green-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-green-700 font-medium mt-1">Arriving soon</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

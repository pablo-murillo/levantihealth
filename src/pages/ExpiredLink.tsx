import { XCircle } from 'lucide-react';

export function ExpiredLink() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Link Expired</h1>
        <p className="text-gray-600">This link has expired or is no longer valid.</p>
      </div>
    </div>
  );
}
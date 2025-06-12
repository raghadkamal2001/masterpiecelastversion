import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PaymentsDashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب جميع المدفوعات
  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      console.log(response.data)
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('فشل في جلب البيانات:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // تحديث حالة الدفع
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/payments/${id}`, { status });
      fetchPayments(); // إعادة تحميل البيانات بعد التحديث
    } catch (error) {
      console.error('فشل في تحديث الحالة:', error);
    }
  };

  if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم - عمليات الدفع</h1>

      {payments.length === 0 ? (
        <p>لا توجد عمليات دفع بعد.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-orange-100 text-gray-700 text-sm">
                <th className="px-4 py-2 text-right">الاسم</th>
                <th className="px-4 py-2 text-right">المبلغ</th>
                <th className="px-4 py-2 text-right">الحالة</th>
                <th className="px-4 py-2 text-right">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-t text-right text-sm">
                  <td className="px-4 py-2">{payment.name}</td>
                  <td className="px-4 py-2">{payment.amount} دينار أردني</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {payment.status === 'accepted'
                        ? 'مقبول'
                        : payment.status === 'rejected'
                        ? 'مرفوض'
                        : 'قيد المراجعة'}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2 flex justify-end">
                    {payment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(payment._id, 'accepted')}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => updateStatus(payment._id, 'rejected')}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          رفض
                        </button>
                      </>
                    )}
                    {(payment.status === 'accepted' || payment.status === 'rejected') && (
                      <span className="text-gray-500">تم الإجراء</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

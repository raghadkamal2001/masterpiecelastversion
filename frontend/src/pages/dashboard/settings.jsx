import React, { useState } from 'react';

 // إعدادات الموقع
 function SettingsContent() {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">إعدادات الموقع</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <form>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b">المعلومات الأساسية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم الموقع</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="قصيد"
                        defaultValue="قصيد"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">شعار الموقع</label>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded">
                          <img src="/api/placeholder/48/48" alt="شعار الموقع" className="w-full h-full object-cover" />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          id="site-logo"
                        />
                        <label
                          htmlFor="site-logo"
                          className="mr-4 bg-gray-100 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200"
                        >
                          تغيير الشعار
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">وصف الموقع</label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows="3"
                        placeholder="وصف مختصر للموقع"
                        defaultValue="موقع قصيد هو منصة عربية للكتب والأدب العربي، يضم مجموعة واسعة من الكتب والاقتباسات لأشهر الأدباء والشعراء العرب."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b">معلومات الاتصال</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="info@qaseed.com"
                        defaultValue="info@qaseed.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="+966 123 456 789"
                        defaultValue="+966 123 456 789"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="الرياض، المملكة العربية السعودية"
                        defaultValue="الرياض، المملكة العربية السعودية"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b">وسائل التواصل الاجتماعي</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">فيسبوك</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://facebook.com/qaseed"
                        defaultValue="https://facebook.com/qaseed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">تويتر</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://twitter.com/qaseed"
                        defaultValue="https://twitter.com/qaseed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">انستغرام</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://instagram.com/qaseed"
                        defaultValue="https://instagram.com/qaseed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">يوتيوب</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://youtube.com/qaseed"
                        defaultValue="https://youtube.com/qaseed"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b">إعدادات الدفع</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">طرق الدفع المتاحة</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="payment-credit" className="ml-2" defaultChecked />
                          <label htmlFor="payment-credit">بطاقات الائتمان</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="payment-paypal" className="ml-2" defaultChecked />
                          <label htmlFor="payment-paypal">PayPal</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="payment-bank" className="ml-2" defaultChecked />
                          <label htmlFor="payment-bank">تحويل بنكي</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">العملة الافتراضية</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                        <option value="AED">درهم إماراتي (AED)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-500"
                  >
                    حفظ الإعدادات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default SettingsContent;
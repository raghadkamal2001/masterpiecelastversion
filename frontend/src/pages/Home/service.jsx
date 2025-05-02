import React from 'react';
import { Phone, FileQuestion, FileText } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Phone className="w-6 h-6 text-orange-500" />,
      title: "دعم وتواصل مستمر",
      description: "توفير تواصل مستمر لضمان تجربة سلسة ومتكاملة"
    },
    {
      icon: <FileQuestion className="w-6 h-6 text-orange-500" />,
      title: "خدمات تفاعلية وتعليمية",
      description: "اختبارات أدبية"
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      title: "شروحات أدبية متقدمة",
      description: "شرح الأساليب البلاغية والتقنيات الشعرية"
    }
  ];

  return (
    <div className="py-12 bg-white mt-15">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center flex-1 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-dotted border-orange-300 mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{service.title}</h3>
              <p dir="rtl" className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
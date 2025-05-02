import { useState } from 'react';

export default function LiteraryFigures() {
  const figures = [
    {
      id: 1,
      name: "المتنبي",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NEUSqNhYgImjdKw1A6M7C6tHq3RwltQ3gQ&s",
      description: "أحمد بن الحسين بن الحسن بن عبدالصمد الجعفي الكوفي الكندي، أبو الطيب المتنبي (303-354هـ/915-965م) الشاعر الحكيم. وأحد مفاخر الأدب العربي، ذو الأمثال السائرة والحكم البالغة والمعاني المبتكرة."
    },
    {
      id: 2,
      name: "غسان كنفاني",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWpN6t0eEzHUP4aUWre4J-BnxEnTaazc4yA&s",
      description: "كاتب وصحفي ومناضل فلسطيني. يعد من أبرز رموز الأدب الفلسطيني والمقاومة الثقافية. ولد في عكا، لكنه توجه مع عائلته إلى لبنان بعد نكبة 1948. أثر صيته على كتاباته التي تركزت على قضية اللاجئين والشعب الفلسطيني، حيث عبر بأسلوب رمزي وعميق عن المعاناة والهوية الفلسطينية."
    },
    {
      id: 3,
      name: "البحتري",
      image: "https://cdn.arageek.com/magazine/2019/04/IMG_7545.jpg",
      description: "الوليد بن عبيد بن يحيى الطائي، أبو عبادة البحتري، شاعر كبير. يقال للشعر (سلسلة الذهب)، وهو أحد الثلاثة الذين كانوا أئمة الشعر أيام عصرهم: المتنبي، وأبو تمام، والبحتري. قيل: أولى الثلاثة البحتري، أي الثلاثة فيهم غلبة، المتنبي وأبو تمام حكيمان، والثالث الشاعر البحتري."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 pt-20 pb-20">
      <div className="text-center mb-20">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-gray-800">أعلام</span>
          <span className="text-orange-500"> الأدب</span>
        </h1>
        <p className="text-gray-600 text-right text-sm max-w-2xl mx-auto">
          أبرز الشخصيات الأدبية التي تركت بصمتها في عالم الأدب من الروائيين والشعراء إلى النقاد والمفكرين. نلقي
          الضوء على حياتهم، أساليبهم الأدبية، وأهم إبداعاتهم التي أثرت في الثقافة الإنسانية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {figures.map((figure) => (
          <div key={figure.id} className="bg-white rounded-lg shadow-md overflow-hidden p-5 flex flex-col items-center text-center max-w-sm mx-auto">
            <img 
              src={figure.image} 
              alt={figure.name} 
              className="w-24 h-24 rounded-full mb-3 object-cover"
            />
            <h2 className="text-lg font-bold mb-2">{figure.name}</h2>
            <p className="text-gray-600 text-right text-sm mb-3" dir="rtl">
              {figure.description.length > 180
                ? `${figure.description.substring(0, 180)}...` 
                : figure.description}
            </p>
            <button 
              className="mt-auto text-amber-500  hover:text-amber-500  flex items-center text-sm font-medium"
              dir="rtl"
            >
              اكتشف المزيد <span className="mr-1">›</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
const User = require('./models/User');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raghadkamall2001:Raghadkamal2001@cluster0.ofonq.mongodb.net/masterpiecelibrary?retryWrites=true&w=majority&appName=Cluster0').then(async () => {
  const admin = new User({
    name: 'Admin User',
    username: 'admin_raghad',
    email: 'adminraghad2001@gmail.com',
    password: 'Raghad@2001', // سيتم تشفيرها تلقائيًا في pre('save')
    role: 'admin'
  });

  await admin.save();
  console.log('✅ تم إنشاء الأدمن بنجاح');
  mongoose.disconnect();
});

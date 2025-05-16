// import React from 'react';

// const AboutUsPage = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-orange-600">
//         Về SGU Restaurant
//       </h1>

//       <section className="mb-8">
//         <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed">
//           SGU Restaurant là nhà hàng hiện đại phục vụ những món ăn đa dạng và phong phú,
//           nằm tại trung tâm Quận 5, TP.HCM. Chúng tôi tự hào mang đến trải nghiệm ẩm thực
//           tuyệt vời kết hợp giữa không gian ấm cúng và dịch vụ chuyên nghiệp.
//         </p>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-2">Thông Tin Liên Hệ</h2>
//         <ul className="text-gray-800 space-y-2 text-base sm:text-lg">
//           <li>📍 Địa chỉ: 273 An Dương Vương, Phường 9, Quận 5, TP.HCM</li>
//           <li>📞 Điện thoại: 02466645656</li>
//           <li>📧 Email: info@sgu.com</li>
//           <li>🌐 Website: www.sgu-restaurant.vn</li>
//         </ul>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-2">Giờ Mở Cửa</h2>
//         <p className="text-gray-700 text-base sm:text-lg">
//           Từ 10:00 - 22:00 (Thứ 2 đến Chủ Nhật)
//         </p>
//       </section>

//       <section>
//         <h2 className="text-xl sm:text-2xl font-semibold mb-2">Mạng Xã Hội</h2>
//         <div className="flex space-x-4">
//           <a href="#" className="hover:text-orange-500">🌐 Website</a>
//           <a href="#" className="hover:text-orange-500">📘 Facebook</a>
//           <a href="#" className="hover:text-orange-500">📷 Instagram</a>
//           <a href="#" className="hover:text-orange-500">💼 LinkedIn</a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUsPage;

import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-orange-600">
        Về SGU Restaurant
      </h1>

      <section className="mb-8">
        <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed">
          SGU Restaurant là nhà hàng hiện đại phục vụ những món ăn đa dạng và phong phú,
          nằm tại trung tâm Quận 5, TP.HCM. Chúng tôi tự hào mang đến trải nghiệm ẩm thực
          tuyệt vời kết hợp giữa không gian ấm cúng và dịch vụ chuyên nghiệp.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Thông Tin Liên Hệ</h2>
        <ul className="text-gray-800 space-y-2 text-base sm:text-lg mb-4">
          <li>📍 Địa chỉ: 273 An Dương Vương, Phường 9, Quận 5, TP.HCM</li>
          <li>📞 Điện thoại: 02466645656</li>
          <li>📧 Email: info@sgu.com</li>
          <li>🌐 Website: www.sgu-restaurant.vn</li>
        </ul>

        <div className="w-full h-64 sm:h-96">
          <iframe
            title="Google Map - SGU Restaurant"
            src="https://www.google.com/maps/place/Saigon+University/@10.7599171,106.6796834,16z/data=!3m1!4b1!4m6!3m5!1s0x31752f1b7c3ed289:0xa06651894598e488!8m2!3d10.7599171!4d106.6822583!16s%2Fm%2F02qvnkv?hl=en&entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
            className="w-full h-full rounded-xl border"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Giờ Mở Cửa</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Từ 10:00 - 22:00 (Thứ 2 đến Chủ Nhật)
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Mạng Xã Hội</h2>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-orange-500">🌐 Website</a>
          <a href="#" className="hover:text-orange-500">📘 Facebook</a>
          <a href="#" className="hover:text-orange-500">📷 Instagram</a>
          <a href="#" className="hover:text-orange-500">💼 LinkedIn</a>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Footer() {
  return (
    <footer className="w-full p-8 bg-gray-300 text-gray-500 border-t border-gray-300">
      <div className="flex items-start justify-between max-w-[1240px] mx-auto flex-col-reverse md:flex-row gap-6">
        {/* Left Section */}
        <Card className="flex-1 p-3 border-none bg-transparent shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold text-gray-800">
              <div className="flex items-center">
                <img
                  src="/public/logo-cnpm-preview.png" alt="Logo"
                  className="w-32 h-auto object-contain"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <h1 className="font-bold mx-4">Food Circles</h1>
            <p className="text-sm ">
              Nơi trải nghiệm sự thăng hoa của ẩm thực, mang hương vị nhà hàng đến
              với gia đình bạn.
            </p>
            <img
              src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
              alt="thong-bao-bo-cong-thuong"
              className="mt-1 w-32"
            />
          </CardContent>
        </Card>

        {/* Center Section */}
        <Card className="flex-2 p-3 border-none bg-transparent shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-gray-700">
              LIÊN HỆ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <h4 className="text-base font-medium text-gray-700">
              CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ DỊCH VỤ NHÓM 14
            </h4>
            <p className="text-sm">
              <strong>Mã số thuế</strong>: 316657994
            </p>
            <p className="text-sm">
              <strong>Địa chỉ ĐKKD</strong>: 273 An Dương Vương, Phường 3, Quận 5, Tp. Hồ Chí Minh
            </p>
            <p className="text-sm">
              <strong>Phone</strong>: 1900 633 818
            </p>
            <p className="text-sm">
              <strong>Email</strong>: order.ptkitchen@gmail.com
            </p>
          </CardContent>
        </Card>

        {/* Right Section */}
        <Card className="flex-1 p-3 border-none bg-transparent shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Hỗ trợ Khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="text-sm space-y-1">
              <li>- Chính sách bảo mật thông tin</li>
              <li>- Quy chế hoạt động</li>
              <li>- Chính sách thanh toán</li>
              <li>- Chính sách thay đổi đơn hàng</li>
              <li>- Chính sách vận chuyển</li>
              <li>- Tự công bố sản phẩm</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}

export default Footer;
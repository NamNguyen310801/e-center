import { Button, Form, Input } from "antd";
import classNames from "classnames";
export default function MainRegister() {
  return (
    <section
      id="dang-ky-hoc"
      className={`${classNames(
        "relative py-10 w-full flex items-center bg-register bg-cover bg-center"
      )}`}>
      <div className="absolute top-0 left-0 h-full right-0 p-0 m-0 bg-cover bg-center bg-no-repeat bg-blue-900/60 "></div>
      <div className="z-[1] container relative flex flex-col gap-y-4 flex-wrap mx-auto">
        <h2 className="relative flex flex-wrap justify-between items-center basis-full">
          <b className="block flex-1 h-[2px] bg-gray-400" />
          <span className="text-white text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
            Đăng ký học thử miễn phí
          </span>
          <b className="block flex-1 h-[2px] bg-gray-400" />
        </h2>
        <p className="w-full flex items-center justify-center">
          <span className="text-[#f0f0f0] text-sm">
            (Đăng ký ngay để trải nghiệm hệ thống học tiếng Anh giao tiếp đã
            giúp các học viên thành công trên con đường chinh phục tiếng Anh. Và
            giờ, đến lượt bạn … )
          </span>
        </p>
        <div className="w-full flex justify-center items-center mt-4">
          <Form name="main-register" className="w-full max-w-[450px]">
            <Form.Item name="name">
              <Input
                placeholder="Nhập họ và tên của bạn..."
                className="px-3 py-[6px] placeholder:text-slate-600"
              />
            </Form.Item>
            <Form.Item name="phone">
              <Input
                placeholder="Nhập số điện thoại của bạn..."
                className="px-3 py-[6px] placeholder:text-slate-600"
              />
            </Form.Item>
            <Form.Item name="address">
              <Input
                placeholder="Nhập địa chỉ của bạn..."
                className="px-3 py-[6px] placeholder:text-slate-600"
              />
            </Form.Item>
            <Form.Item name="note">
              <Input
                placeholder="Ghi chú thêm..."
                className="px-3 py-[6px] placeholder:text-slate-600"
              />
            </Form.Item>
            <Form.Item className="flex items-center justify-center">
              <Button
                // loading={loading}
                type="primary"
                htmlType="submit"
                className="bg-[#119bf7] hover:bg-[#4f87cc] mt-2 hover:scale-95 uppercase font-semibold">
                Đăng ký học miễn phí
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

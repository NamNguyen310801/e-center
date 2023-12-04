import { useMemo, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function ProfileIntro() {
  const user = useSelector((state) => state.auth.user);
  const [monthsAgo, setMonthsAgo] = useState(0);
  useMemo(() => {
    const createdAt = new Date(user?.createdAt);
    const now = new Date();
    // Tính số tháng giữa createdAt và thời điểm hiện tại
    const monthsDiff =
      (now.getFullYear() - createdAt.getFullYear()) * 12 +
      (now.getMonth() - createdAt.getMonth());

    setMonthsAgo(monthsDiff);
  }, []);
  return (
    <section className="w-full lg:basis-[41.66667%] lg:max-w-[41.66667%] px-1 md:px-2 lg:px-3">
      <div className="flex flex-col">
        <div
          className="flex flex-col bg-white rounded-lg mb-5 md:px-[14px] py-[18px] break-words"
          style={{
            boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
          }}>
          <h4 className="text-base font-semibold">Giới thiệu</h4>
          <div className="flex items-start text-sm/7 mt-[15px]">
            <div className="flex items-center gap-x-2">
              <FaUserGroup className="text-[#808990] text-xl" />
              <span>
                Thành viên của
                <span className="font-semibold mx-1">Wonderland</span>
                từ {monthsAgo || 0} tháng trước
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col bg-white rounded-lg mb-5 md:px-[14px] py-[18px] break-words"
          style={{
            boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
          }}>
          <h4 className="text-base font-semibold">Hoạt động gần đây</h4>
          <div className="text-[13px]">Chưa có hoạt động gần đây</div>
        </div>
      </div>
    </section>
  );
}

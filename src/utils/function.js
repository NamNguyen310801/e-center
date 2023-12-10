import * as XLSX from "xlsx";

// item admin
export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
//convert image to base64
export const getBase64 = (file) => {
  const data = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  return data;
};
//Ktra co la json string khong
export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

//
export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};
//
export const convertPrice = (price) => {
  try {
    // const result = price?.toLocaleString().replaceAll(",", ".");
    const result = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return result;
  } catch (error) {
    return null;
  }
};
//conert time
export const convertISOToNewFormat = (isoTime) => {
  const date = new Date(isoTime);

  // Lấy giờ, phút và giây
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

//
export const dateFormatList = [
  "DD/MM/YYYY",
  "DD/MM/YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
];
export const convertDateFormat = (date) => {
  const convertDate = new Date(date);
  const day = convertDate.getDate();
  const month = convertDate.getMonth() + 1;
  const year = convertDate.getFullYear();
  return day + "-" + month + "-" + year;
};

export const extractVideoSrc = (link) => {
  // Sử dụng biểu thức chính quy để trích xuất giá trị của thuộc tính src
  const regex = /<iframe .*?src=['"](.*?)['"].*?<\/iframe>/;
  const match = link.match(regex);
  // Kiểm tra xem có trùng khớp không và trả về giá trị src nếu có
  return match ? match[1] : null;
};
export const isDateBeforeToday = (date) => {
  // Chuyển đổi inputDate thành đối tượng Date
  const inputDateTime = new Date(date);
  // Lấy ngày hiện tại
  const currentDate = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
  // So sánh ngày
  return inputDateTime < fiveYearsAgo;
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i);
  }
  return buf;
};

export const workbook2blob = (workbook) => {
  const wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  };
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });
  return blob;
};

export const calculateMonthlyTuitionSummary = (students) => {
  const monthlyTuitionSummary = {};
  students?.forEach((student) => {
    student?.tuitionList.forEach((tuition) => {
      const monthYear = new Date(tuition.createdAt).toLocaleString("en-US", {
        month: "numeric",
        year: "numeric",
      });
      const tuitionAmount = tuition?.amountFee;
      if (!monthlyTuitionSummary[monthYear]) {
        monthlyTuitionSummary[monthYear] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }
      // Tổng học phí
      monthlyTuitionSummary[monthYear].total += tuitionAmount;
      if (tuition?.status === false) {
        monthlyTuitionSummary[monthYear].unPaid += tuitionAmount;
      }
      if (tuition?.status === true) {
        monthlyTuitionSummary[monthYear].paid += tuitionAmount;
      }
    });
  });
  // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(monthlyTuitionSummary).map((month) => ({
    month,
    ...monthlyTuitionSummary[month],
  }));

  return resultArray;
};
export const calculateQuarterlyTuitionSummary = (students) => {
  const quarterlyTuitionSummary = {};

  students?.forEach((student) => {
    student?.tuitionList.forEach((tuition) => {
      const transactionDate = new Date(tuition.createdAt);
      // Xác định quý
      const quarter = Math.floor((transactionDate.getMonth() + 3) / 3);

      const tuitionAmount = tuition?.amountFee;
      if (!quarterlyTuitionSummary[quarter]) {
        quarterlyTuitionSummary[quarter] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }
      quarterlyTuitionSummary[quarter].total += tuitionAmount;
      if (tuition?.status === false) {
        quarterlyTuitionSummary[quarter].unPaid += tuitionAmount;
      }
      if (tuition?.status === true) {
        quarterlyTuitionSummary[quarter].paid += tuitionAmount;
      }
    });
  });
  const resultArray = Object.keys(quarterlyTuitionSummary).map((quarter) => ({
    quarter: `${quarter}/${new Date().getFullYear()}`,
    ...quarterlyTuitionSummary[quarter],
  }));
  return resultArray;
};
export const calculateYearlyTuitionSummary = (students) => {
  const yearlyTuitionSummary = {};
  students?.forEach((student) => {
    student?.tuitionList.forEach((tuition) => {
      const year = new Date(tuition.createdAt).getFullYear();
      const tuitionAmount = tuition?.amountFee;
      if (!yearlyTuitionSummary[year]) {
        yearlyTuitionSummary[year] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }

      yearlyTuitionSummary[year].total += tuitionAmount;
      if (tuition?.status === false) {
        yearlyTuitionSummary[year].unPaid += tuitionAmount;
      }
      if (tuition?.status === true) {
        yearlyTuitionSummary[year].paid += tuitionAmount;
      }
    });
  }); // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(yearlyTuitionSummary).map((year) => ({
    year: parseInt(year),
    ...yearlyTuitionSummary[year],
  }));

  return resultArray;
};
export const calculateTuitionByClass = (students) => {
  const tuitionByClassSummary = {};
  students?.forEach((student) => {
    const klass = student?.klass;
    student?.tuitionList.forEach((tuition) => {
      const tuitionAmount = tuition?.amountFee;

      // Khởi tạo giá trị mảng cho lớp nếu chưa tồn tại
      if (!tuitionByClassSummary[klass]) {
        tuitionByClassSummary[klass] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }
      // Tổng học phí
      tuitionByClassSummary[klass].total += tuitionAmount;

      // Tổng học phí với status false
      if (tuition.status === false) {
        tuitionByClassSummary[klass].unPaid += tuitionAmount;
      }

      // Tổng học phí với status true
      if (tuition.status === true) {
        tuitionByClassSummary[klass].paid += tuitionAmount;
      }
    });
  });

  // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(tuitionByClassSummary).map((klass) => ({
    klass,
    ...tuitionByClassSummary[klass],
  }));

  return resultArray;
};
export const calculateMonthlySalarySummary = (teachers) => {
  const monthlySalarySummary = {};
  teachers?.forEach((teacher) => {
    teacher?.salaryList.forEach((salary) => {
      const monthYear = new Date(salary.createdAt).toLocaleString("en-US", {
        month: "numeric",
        year: "numeric",
      });
      const salaryAmount = salary?.amountSalary;
      if (!monthlySalarySummary[monthYear]) {
        monthlySalarySummary[monthYear] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }
      // Tổng học phí
      monthlySalarySummary[monthYear].total += salaryAmount;
      if (salary.status === false) {
        monthlySalarySummary[monthYear].unPaid += salaryAmount;
      }
      if (salary.status === true) {
        monthlySalarySummary[monthYear].paid += salaryAmount;
      }
    });
  });
  // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(monthlySalarySummary).map((month) => ({
    month,
    ...monthlySalarySummary[month],
  }));

  return resultArray;
};
export const calculateYearlySalarySummary = (teachers) => {
  const yearlySalarySummary = {};
  teachers?.forEach((teacher) => {
    teacher?.salaryList.forEach((salary) => {
      const year = new Date(salary.createdAt).getFullYear();
      const salaryAmount = salary?.amountSalary;
      if (!yearlySalarySummary[year]) {
        yearlySalarySummary[year] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }

      yearlySalarySummary[year].total += salaryAmount;
      if (salary?.status === false) {
        yearlySalarySummary[year].unPaid += salaryAmount;
      }
      if (salary?.status === true) {
        yearlySalarySummary[year].paid += salaryAmount;
      }
    });
  }); // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(yearlySalarySummary).map((year) => ({
    year: parseInt(year),
    ...yearlySalarySummary[year],
  }));

  return resultArray;
};
export const calculateQuarterlySalarySummary = (teachers) => {
  const quarterlySalarySummary = {};

  teachers?.forEach((teacher) => {
    teacher?.salaryList.forEach((salary) => {
      const transactionDate = new Date(salary.createdAt);
      // Xác định quý
      const quarter = Math.floor((transactionDate.getMonth() + 3) / 3);

      const salaryAmount = salary?.amountSalary;
      if (!quarterlySalarySummary[quarter]) {
        quarterlySalarySummary[quarter] = {
          total: 0,
          unPaid: 0,
          paid: 0,
        };
      }
      quarterlySalarySummary[quarter].total += salaryAmount;
      if (salary?.status === false) {
        quarterlySalarySummary[quarter].unPaid += salaryAmount;
      }
      if (salary?.status === true) {
        quarterlySalarySummary[quarter].paid += salaryAmount;
      }
    });
  });
  const resultArray = Object.keys(quarterlySalarySummary).map((quarter) => ({
    quarter: `${quarter}/${new Date().getFullYear()}`,
    ...quarterlySalarySummary[quarter],
  }));
  return resultArray;
};

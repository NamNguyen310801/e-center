export const url = process.env.REACT_APP_API_URL;

//USER
export const loginURL = `${url}/user/log-in`;
export const registerURL = `${url}/user/register`;
export const logoutURL = `${url}/user/log-out`;
export const refreshTokenURL = `${url}/user/refresh-token`;

export const forgetPasswordURL = `${url}/user/forgot-password`;
export const verifyOTPURL = `${url}/user/verify-otp`;
export const resetPasswordURL = `${url}/user/reset-password`;

export const getAllUserURL = `${url}/user/getAll`;
export const getAllStudentURL = `${url}/user/getAllStudent`;
export const getAllTeacherURL = `${url}/user/getAllTeacher`;
export const getDetailUserURL = `${url}/user/get-detail`;

export const updateUserURL = `${url}/user/update-user`;
export const updateTeacherURL = `${url}/user/update-teacher`;
export const updateStudentURL = `${url}/user/update-student`;

export const registerCourseURL = `${url}/user/add-course`;
export const updateCourseStudentURL = `${url}/user/update-course`;
export const addTuitionStudentURL = `${url}/user/add-tuition`;
export const updateTuitionStudentURL = `${url}/user/update-tuition`;
export const deleteTuitionStudentURL = `${url}/user/delete-tuition`;
export const addSalaryTeacherURL = `${url}/user/add-salary`;
export const updateSalaryTeacherURL = `${url}/user/update-salary`;
export const deleteSalaryTeacherURL = `${url}/user/delete-salary`;
export const deleteUserURL = `${url}/user/delete-user`;
export const deleteManyUserURL = `${url}/user/delete-many`;

//CLASS
export const createClassURL = `${url}/class/create`;
export const updateClassURL = `${url}/class/update`;
export const getAllClassURL = `${url}/class/getAll`;
export const deleteClassURL = `${url}/class/delete-class`;
//Video
export const createVideoURL = `${url}/video/create`;
export const updateVideoURL = `${url}/video/update`;
export const getAllVideoURL = `${url}/video/getAll`;
export const deleteVideoURL = `${url}/video/delete-video`;
//Image
export const createImageURL = `${url}/image/create`;
export const updateImageURL = `${url}/image/update`;
export const getAllImageURL = `${url}/image/getAll`;
export const deleteImageURL = `${url}/image/delete-image`;
//Banner
export const createBannerURL = `${url}/banner/create`;
export const updateBannerURL = `${url}/banner/update`;
export const getAllBannerURL = `${url}/banner/getAll`;
export const deleteBannerURL = `${url}/banner/delete-banner`;
//TUITION
export const createTuitionURL = `${url}/tuition/create`;
export const updateTuitionURL = `${url}/tuition/update`;
export const getAllTuitionURL = `${url}/tuition/getAll`;
export const deleteTuitionURL = `${url}/tuition/delete-tuition`;

//SALARY
export const createSalaryURL = `${url}/salary/create`;
export const updateSalaryURL = `${url}/salary/update`;
export const getAllSalaryURL = `${url}/salary/getAll`;
export const deleteSalaryURL = `${url}/salary/delete-salary`;

//SCHEDULE
export const createScheduleURL = `${url}/schedule/create`;
export const updateScheduleURL = `${url}/schedule/update`;
export const getAllScheduleURL = `${url}/schedule/getAll`;
export const deleteScheduleURL = `${url}/schedule/delete-schedule`;

//COURSE
export const createCourseURL = `${url}/course/create`;
export const updateCourseURL = `${url}/course/update`;
export const getAllCourseURL = `${url}/course/getAll`;
export const getDetailCourseURL = `${url}/course/get-detail`;
export const deleteCourseURL = `${url}/course/delete-course`;
export const createRatingURL = `${url}/course/create-review`;
export const updateCourseRatingURL = `${url}/course/update-rating`;

export const courseURL = `${url}/course`;

//LESSON
export const createLessonURL = `${url}/lesson/create`;
export const updateLessonURL = `${url}/lesson/update`;
export const getAllLessonURL = `${url}/lesson/getAll`;
export const deleteLessonURL = `${url}/lesson/delete-lesson`;
//Email
export const sendTuitionURL = `${url}/email/send-tuition`;
export const sendSalaryURL = `${url}/email/send-salary`;
export const confirmRegisterCourseURL = `${url}/email/confirm-course`;

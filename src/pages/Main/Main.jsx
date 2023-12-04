import {
  MainCourse,
  MainModel,
  MainRegister,
  MainStudent,
  MainStudy,
  MainTeacher,
} from "./components";
import "./main.css";
import MainEvent from "./components/MainEvent";
import Banner from "../Banner/Banner";
export default function Main() {
  return (
    <>
      <Banner />
      <main className="pt-16">
        <MainCourse />
        <MainStudy />
        <MainModel />
        <MainStudent />
        <MainTeacher />
        <MainEvent />
        <MainRegister />
      </main>
    </>
  );
}

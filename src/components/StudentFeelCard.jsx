export default function StudentFeelCard({ item }) {
  return (
    <div className="group relative basis-full lg:basis-1/3 max-w-[100%] lg:max-w-[33.333333%] px-4 pb-7 cursor-pointer rounded overflow-hidden">
      <div className="relative bg-center bg-cover overflow-hidden h-auto pt-[56.25%] mb-0 w-full rounded-md">
        <img
          className="w-full h-full top-0 left-0 right-0 bottom-0 object-fill max-w-[100%] absolute rounded-md"
          src={
            item?.image ||
            "http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/ratte.png"
          }
          alt={item?.name || ""}
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:bg-gray-800/50 z-[2] "></div>
      </div>
    </div>
  );
}

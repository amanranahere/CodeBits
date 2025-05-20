import { Link } from "react-router-dom";

export default function LogoBox() {
  return (
    <Link
      to={"/"}
      className="h-14 px-6 flex items-center dark:bg-[#1f1f1f] dark:hover:brightness-150 duration-300 dark:text-[#f1f1f1] gap-x-2 rounded-[1.2rem]"
    >
      <div>OO</div>
      <div className="font-bold">CODE-BITS</div>
    </Link>
  );
}

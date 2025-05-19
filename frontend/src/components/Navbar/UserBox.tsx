import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

export default function LogoBox() {
  const user = useUserStore((state) => state.user);
  console.log("User in LogoBox:", user);

  return (
    <Link
      to={"/"}
      className="h-14 px-6 flex items-center dark:bg-[#1f1f1f] dark:hover:brightness-150 duration-300 dark:text-[#f1f1f1] gap-x-2 rounded-2xl"
    >
      <div className="px-6 flex items-center gap-x-2 ">
        {user ? (
          <div>
            <span>{user?.name}</span>

            {/* add profile img here */}
          </div>
        ) : (
          <div>
            <span>GUEST USER</span>

            {/* add profile img here */}
          </div>
        )}
      </div>
    </Link>
  );
}

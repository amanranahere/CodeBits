import { useUserStore } from "../stores/userStore";
import HomeGuest from "../components/HomeGuest/HomeGuest";
import HomeUser from "../components/HomeUser/HomeUser";

export default function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="h-full w-full">{user ? <HomeUser /> : <HomeGuest />}</div>
  );
}

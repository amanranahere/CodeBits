import { useUserStore } from "../stores/userStore";
import HomeGuest from "../components/Layout/HomeGuest";
import HomeUser from "../components/Layout/HomeUser";

export default function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="h-screen w-full">{user ? <HomeUser /> : <HomeGuest />}</div>
  );
}

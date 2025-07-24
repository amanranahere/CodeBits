import { useUIStore } from "../../stores/uiStore";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";

export default function AuthPanel() {
  const { loginOpen, signupOpen } = useUIStore();

  return (
    <div className="fixed left-0 top-0 md:h-[60%] h-full lg:h-full w-full md:w-[450px] lg:w-[420px] overflow-hidden z-[999] p-6 lg:p-8">
      {loginOpen && <LoginBox />}
      {signupOpen && <SignupBox />}
    </div>
  );
}

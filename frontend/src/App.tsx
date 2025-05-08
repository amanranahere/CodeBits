import "./App.css";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div className="h-screen bg-[#f1f1f1] dark:bg-[#282828] text-white flex justify-center items-center">
        Its working!
      </div>
    </>
  );
}

export default App;

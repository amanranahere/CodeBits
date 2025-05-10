import { Link } from "react-router-dom";

const Sidebar = () => {
  const files = ["snippet01", "snippet02", "snippet03"];

  return (
    <aside className="bg-[#282828] text-[#f1f1f1] w-40 p-2">
      <h2 className="font-bold mb-2">FILES</h2>

      <ul>
        {files.map((file) => (
          <li key={file}>
            <Link
              to={`/file/${file}`}
              className="block hover:bg-[#3a3a3a] p-1 rounded-xs"
            >
              {file}.js
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

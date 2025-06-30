import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function UsageSection() {
  type OptKey = "axios" | "tsconfig" | "css" | "mongo";

  const [optActive, setOptActive] = useState<OptKey>("axios");

  const options: { key: OptKey; label: string }[] = [
    { key: "axios", label: "Axios Configuration" },
    { key: "tsconfig", label: "TS Config Setup" },
    { key: "css", label: "CSS Button Variants" },
    { key: "mongo", label: "MongoDB Setup" },
  ];

  const code = {
    axios: `import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Add access token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = \`Bearer \${token}\`;
  }
  return config;
});

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response.data?.message === "TokenExpiredError" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { data } = await axios.post("/api/v1/refresh-token", {}, { withCredentials: true });

      localStorage.setItem("accessToken", data.accessToken);
      axiosInstance.defaults.headers.common["Authorization"] = \`Bearer \${data.accessToken}\`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;`,

    tsconfig: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "types": ["node"]
  },
  "include": ["src", "env.d.ts"]
}`,

    css: `/* custom button */

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
 }

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
}`,

    mongo: `import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};`,
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row justify-between items-center">
      {/* title and subtext */}
      <div className="w-full lg:w-[48%] h-[80vh] flex flex-col justify-center px-4 md:px-16">
        <h1 className="text-3xl md:text-5xl font-bold pb-3 md:pb-5">
          Built for code you don't want to rewrite
        </h1>
        <p className="md:text-lg text-[#bababa] font-semibold">
          Instead of digging through old projects to copy the same config or
          utility, save it once in CodeBits. It stays ready for whenever you
          need it again.
        </p>

        {/* examples list */}
        <div className="pt-5 flex flex-col justify-start items-start md:text-lg text-[#7a7a7a] font-semibold">
          <p className="md:text-lg text-[#bababa] font-semibold pb-2">
            The kind of code you save to avoid déjà vu.
          </p>

          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setOptActive(opt.key)}
              className={`hover:text-[#bababa] duration-150 ${
                optActive === opt.key ? "text-white" : ""
              } `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* codebox */}
      <div className="relative w-[95%] lg:w-[50%] min-h-[70vh] md:h-[80vh] pt-10">
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl rounded-bl-xl overflow-hidden overflow-y-auto overflow-x-auto no-scrollbar">
          <Highlight code={code[optActive]} language="ts" theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} pt-3`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    <span className="px-4 text-zinc-500 select-none">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>

        <div className="absolute inset-y-0 right-0 w-[30%] pointer-events-none bg-gradient-to-l from-[#151515] to-transparent"></div>
      </div>
    </div>
  );
}

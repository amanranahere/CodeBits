import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { motion } from "framer-motion";

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
    <div className="flex justify-center items-center">
      <div className="relative h-screen w-full md:w-[90%] lg:w-[85%] flex flex-col-reverse lg:flex-row justify-around gap-y-8 lg:gap-y-0 items-center">
        {/* codebox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-[95%] lg:w-[52%] min-h-[70vh] md:h-[80vh]"
        >
          <div className="w-full h-full bg-[#1e1e1e] rounded-xl rounded-bl-xl overflow-hidden overflow-y-auto overflow-x-auto no-scrollbar">
            <Highlight
              code={code[optActive]}
              language="ts"
              theme={themes.vsDark}
            >
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
        </motion.div>

        {/* title and subtext */}
        <div className="w-full lg:w-[48%] h-[80vh] flex flex-col gap-y-3 md:gap-y-5 px-4 md:px-0 pt-10 lg:-translate-x-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 1 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Built for code you don't want to rewrite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 1 }}
            className="w-full md:text-lg text-[#bababa] font-semibold"
          >
            Instead of digging through old projects to copy the same config or
            utility, save it once in CodeBits. It stays ready for whenever you
            need it again.
            <br />
            The kind of code you save to avoid déjà vu.
          </motion.p>

          {/* examples list */}
          <div className="flex flex-col justify-start items-start md:text-lg  font-semibold">
            {options.map((opt, i) => (
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.4 + i * 0.1,
                }}
                key={opt.key}
                onClick={() => setOptActive(opt.key)}
                className={`hover:text-[#9a9a9a] duration-150 ${
                  optActive === opt.key ? "text-[#bababa]" : "text-[#6a6a6a]"
                } `}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

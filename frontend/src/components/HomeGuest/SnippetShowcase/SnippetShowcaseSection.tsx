import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { IoSunny, IoMoon, IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { SiJavascript, SiTypescript, SiCss3 } from "react-icons/si";
import { BiCodeBlock } from "react-icons/bi";
import { motion } from "framer-motion";

export default function SnippetShowcaseSection() {
  type Theme = "light" | "dark";
  const [theme, setTheme] = useState<Theme>("dark");
  const [copied, setCopied] = useState(false);

  type OptKey = "axios" | "tsconfig" | "css" | "mongo";
  const [optActive, setOptActive] = useState<OptKey>("axios");
  const options: { key: OptKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "axios",
      label: "Axios Configuration",
      icon: <SiJavascript className="w-4 h-4" />,
    },
    {
      key: "tsconfig",
      label: "TS Config Setup",
      icon: <SiTypescript className="w-4 h-4" />,
    },
    {
      key: "css",
      label: "CSS Button Variants",
      icon: <SiCss3 className="w-4 h-4" />,
    },
    {
      key: "mongo",
      label: "MongoDB Setup",
      icon: <SiJavascript className="w-4 h-4" />,
    },
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[optActive]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <section className="relative w-full bg-black text-white py-16 md:py-24 lg:py-28 px-4 md:px-10 flex flex-col items-center justify-center gap-y-3 lg:gap-y-6 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center items-center gap-x-1 px-3 py-1 text-sm text-[#ffffff80] rounded-full shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),_inset_0_0_1vw_hsla(0,0%,100%,0.2)] select-none"
        >
          <BiCodeBlock className="w-3 h-3 lg:w-4 lg:h-4" />
          <span>Example Snippets</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-center"
        >
          Code you don't want to rewrite
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "linear", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full lg:w-[60%] text-[#bababa] text-lg font-medium text-center leading-tight"
      >
        Some snippets are worth saving because you use them everywhere. Store
        them once in CodeBits and they'll always be ready when you need them
        again.
      </motion.p>

      {/*  codebox  */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-[100%] lg:w-[80%] h-[90vh] border-2 border-[#d6ebfd30] rounded-[25px] flex flex-col overflow-hidden my-3 lg:my-6"
      >
        {/*  navbar  */}
        <div className="min-h-10 lg:min-h-12 px-4 lg:px-5 border-b-2 border-[#d6ebfd30] flex justify-between">
          <div className="flex gap-x-2 items-center justify-center">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#ff6465eb]"></div>
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#ffd60a]"></div>
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#43fea4ab]"></div>
          </div>

          <div className="flex gap-x-2 justify-center items-center">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-[#1a1a1a] border-2 border-[#d6ebfd30] font-bold rounded-lg flex items-center gap-x-2 duration-150"
            >
              {copied ? (
                <>
                  <TiTick className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                </>
              ) : (
                <>
                  <IoCopyOutline className="w-3 h-3 lg:w-4 lg:h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-[#1a1a1a] border-2 border-[#d6ebfd30] font-bold rounded-lg flex justify-center items-center gap-x-2 duration-150"
            >
              {theme === "dark" ? (
                <IoSunny className="w-3 h-3 lg:w-4 lg:h-4" />
              ) : (
                <IoMoon className="w-3 h-3 lg:w-4 lg:h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="h-full flex flex-col lg:flex-row">
          {/*  left-panel */}
          <div className="max-h-min lg:h-full w-full lg:w-[300px] p-4 flex flex-row lg:flex-col justify-start items-start gap-x-6 lg:gap-x-0 lg:gap-y-1 md:text-lg font-semibold overflow-x-auto no-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setOptActive(opt.key)}
                className={`h-full lg:h-min flex justify-center items-center gap-x-2 hover:text-[#9a9a9a] duration-150 whitespace-nowrap ${
                  optActive === opt.key ? "text-[#bababa]" : "text-[#6a6a6a]"
                } `}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          {/*  right-panel  */}
          <div
            className={`w-full h-full overflow-auto rounded-br-[25px] pb-20 
          ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#fff]"}
          `}
          >
            <Highlight
              code={code[optActive]}
              language="ts"
              theme={theme === "dark" ? themes.vsDark : themes.vsLight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} pt-3`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className="px-4 text-zinc-500 select-none">
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

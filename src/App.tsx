import * as Chrome from "@/lib/chrome";
import EditMenu from "@/pages/edit";
import RoleMenu from "@/pages/menu";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotAws from "./pages/not-aws";

function App() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<chrome.tabs.Tab | null>(null);
  useEffect(() => {
    Chrome.getActiveTab().then((tab) => setCurrent(tab));
  }, []);

  useEffect(() => {
    const isAws = current?.url?.includes("console.aws.amazon.com");
    navigate(isAws ? "/" : "/not-aws");
  }, [current, navigate]);

  return (
    <Routes>
      <Route path="/" element={<RoleMenu />} />
      <Route path="/edit" element={<EditMenu />} />
      <Route path="/not-aws" element={<NotAws />} />
    </Routes>
  );
}

export default App;

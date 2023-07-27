import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

type Role = {
  account: string;
  roleName: string;
  displayName: string;
};

const go = (url: string) => {
  chrome.tabs.create({ url });
};

function App() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<chrome.tabs.Tab | null>(null);
  const [isAws, setIsAws] = useState(false);

  const setCurrentActiveTab = async () => {
    const active = await chrome.tabs.query({ active: true, currentWindow: true });
    setCurrent(active[0]);
  };

  useEffect(() => {
    setCurrentActiveTab();
  }, []);

  useEffect(() => {
    setIsAws(current?.url?.includes('aws.amazon.com') ?? false);
    navigate(isAws ? '/' : '/not-aws', { replace: true });
  }, [current]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ShortCuts />} />
        <Route path="/options" element={<Options isAws={isAws} />} />
        <Route path="/not-aws" element={<NotAWS />} />
      </Routes>
    </div>
  );
}

const ShortCuts = () => {
  const roleList: Role[] = [{ account: '1', roleName: 'a', displayName: 'test' }];

  const getURL = (role: Role) => {
    const urlParams = new URLSearchParams(role);
    go(`https://signin.aws.amazon.com/switchrole?${urlParams.toString()}`);
  };
  return (
    <>
      <ul>
        {roleList.map((role) => (
          <a key={role.displayName} href="" onClick={() => getURL(role)}>
            <li>a</li>
          </a>
        ))}
      </ul>
      <div className="flex gap-4 text-center">
        <Link className="p-2 bg-slate-600 rounded text-white" to="/options">
          Options
        </Link>
      </div>
    </>
  );
};

const Options: React.FC<{ isAws: Boolean }> = ({ isAws }) => {
  return (
    <>
      <div>Options</div>
      <Link className="p-2 bg-slate-600 rounded text-white" to={isAws ? '/' : '/not-aws'}>
        Back
      </Link>
    </>
  );
};

const NotAWS = () => {
  const accountId = import.meta.env.VITE_ACCOUNT_ID;
  return (
    <div className="flex gap-4 text-center">
      <a
        href=""
        className="p-2 bg-slate-600 rounded text-white"
        onClick={() => go(`https://${accountId}.signin.aws.amazon.com/console`)}
      >
        To Login
      </a>
      <Link className="p-2 bg-slate-600 rounded text-white" to="/options">
        Options
      </Link>
    </div>
  );
};

export default App;

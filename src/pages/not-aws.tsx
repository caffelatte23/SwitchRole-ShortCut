const NotAws = () => {
  const ToConsole = (e: React.MouseEvent) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://console.aws.amazon.com' });
  };

  return (
    <div className="box-border flex min-h-[300px] w-[350px] flex-col items-center justify-center gap-4 rounded p-4">
      <a
        href=""
        className="rounded bg-slate-600 px-4 py-2 text-white"
        onClick={(e) => ToConsole(e)}
      >
        To AWS Console
      </a>
    </div>
  );
};

export default NotAws;

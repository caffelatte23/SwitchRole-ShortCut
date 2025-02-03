import { AddIcon, EditIcon, TrashIcon } from '@/components/icons';
import * as Chrome from '@/lib/chrome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export type Role = {
  account: string;
  displayName: string;
  roleName: string;
};

const RoleMenu = () => {
  return (
    <div className="box-border flex w-[350px] flex-col gap-4 rounded p-4">
      <div className="flex justify-end">
        <Link to={'/edit'}>
          <AddIcon className="size-6 rounded-full p-1 hover:bg-slate-300" />
        </Link>
      </div>
      <RoleList />
    </div>
  );
};

const RoleList: React.FC = () => {
  const [roleList, setRoleList] = useState<Role[] | null>(null);

  const onDelete = (role: Role) => {
    const newItems = [...(roleList as Role[])];
    const idx = roleList?.findIndex((d) => d.account === role.account) ?? -1;
    if (idx === -1) return;

    newItems.splice(idx, 1);
    Chrome.storage.set(newItems);

    setRoleList(newItems);
  };

  useEffect(() => {
    Chrome.storage.get().then((item) => {
      if (!item) Chrome.storage.set([]);
      setRoleList((item as Role[] | null) ?? []);
    });
  }, []);

  return (
    <ul className="flex max-h-[300px] flex-col gap-2 overflow-y-scroll">
      {roleList?.map((role, idx) => (
        <RoleItem key={`item-${idx}`} role={role} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const RoleItem: React.FC<{ role: Role; onDelete?: (role: Role) => void }> = ({
  role,
  onDelete,
}) => {
  const navigate = useNavigate();

  const onSwitch = async (e: React.MouseEvent) => {
    e.preventDefault();
    const tab = await Chrome.getActiveTab();
    if (!tab?.id) return;

    const profile = {
      displayName: role.displayName,
      account: role.account,
      roleName: role.roleName,
      color: 'aaaaaa',
      redirectUri: encodeURIComponent(
        'https://ap-northeast-1.console.aws.amazon.com/console/home?region=ap-northeast-1#'
      ),
    };
    return new Promise((resolve, reject) => {
      if (!tab.id) reject();
      chrome.tabs.sendMessage(
        tab.id as number,
        { action: 'switch', data: profile },
        resolve
      );
    });
  };

  return (
    <li className="group flex rounded border border-slate-300 px-4 py-2">
      <a href="#" onClick={(e) => onSwitch(e)}>
        {role.displayName}
      </a>
      <div className="invisible ml-auto group-hover:visible">
        <button
          className="rounded-full p-1 hover:bg-slate-200"
          onClick={() => navigate('/edit', { state: { role } })}
        >
          <EditIcon className="size-4 text-slate-400" />
        </button>
        <button
          className="ml-1 rounded-full p-1 hover:bg-red-200"
          onClick={() => onDelete?.(role)}
        >
          <TrashIcon className="size-4 text-red-400" />
        </button>
      </div>
    </li>
  );
};

export default RoleMenu;

export type SwitchRoleParams = {
  account: number;
  roleName: string;
  displayName: string;
  color: string;
  redirectUrl: string;
};

export type AWSConsole = {
  Auth: {
    getMbtc: () => number;
  };
};

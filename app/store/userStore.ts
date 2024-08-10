export type IUserInfo = {
  username?: number;
  email?: string;
  img?: string;
};

export interface IUserStore {
  userInfo: IUserInfo;
  setUserInfo: (value: IUserInfo) => void;
}

const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo: function (v) {
      this.userInfo = v;
    },
  };
};

export default userStore;

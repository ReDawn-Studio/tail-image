import userStore, { IUserStore } from "./userStore";
export interface IStore {
  user: IUserStore;
}
export default function createStore(defaultValue: any): () => IStore {
  return () => {
    return {
      user: { ...userStore(), ...defaultValue?.user },
    };
  };
}

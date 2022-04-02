import React, { useState } from "react";

export type User = {
  fullname: string;
  email: string;
};

export const UserContext = React.createContext({ user: undefined, setUser: (u: User) => {} } as {
  user?: User | null;
  setUser: (u: User | null) => any;
});

const UserContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>();
  const _setUser = (u: User | null) => {
    setUser(u);
  };

  return <UserContext.Provider value={{ user, setUser: _setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

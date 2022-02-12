import React, { useState } from "react";

export const UserContext = React.createContext({ user: undefined, setUser: undefined } as { user: any; setUser: any });

const UserContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

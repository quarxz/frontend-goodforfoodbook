/**
 * Accept status messages and return them to the root layout.
 * Use Material Alert
 * https://mui.com/material-ui/react-alert/
 * https://mui.com/material-ui/react-snackbar/#notistack
 */

import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  console.log(message);

  function addMessage(message) {
    setMessage(message);
  }
  return (
    <MessageContext.Provider value={{ message, addMessage }}>{children}</MessageContext.Provider>
  );
}

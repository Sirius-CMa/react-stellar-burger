import { refreshToken } from "Action/authorization";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(`${action.payload}`);
        dispatch({ type: wsConnecting })
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: 'Error' });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === 'Invalid or missing token') {
            dispatch(refreshToken({ token: localStorage.getItem("refreshToken") }))
          } else { dispatch({ type: onMessage, payload: parsedData }); }


        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null
        }
      }

      next(action);
    };
  };
};

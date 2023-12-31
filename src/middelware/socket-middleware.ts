import { refreshToken } from "Action/authorization";
import { Middleware } from "redux";
import { TWSActions } from "../typesData/WSTypes";



type Props = {
  wsActions: TWSActions;
}

export const socketMiddleware = ({ wsActions }: Props): Middleware<{}> => {
  return store => {
    let socket: (WebSocket | null) = null;

    return next => action => {
      const { dispatch } = store;

      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,

        onOpen,
        onClose,
        onError,
        onMessage,

        wsConnecting,
        // wsSendMessage
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
          // console.log('parsedData', parsedData);
          if (parsedData.message === 'Invalid or missing token') {
            console.log('WS middelware - ', parsedData.message);
            // dispatch(refreshToken())
            dispatch({ type: wsConnecting })
          } else { dispatch({ type: onMessage, payload: parsedData }); }


        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };

        // if (wsSendMessage && type === wsSendMessage) {
        //   socket.send(JSON.stringify(action.payload));
        // }

        if (type === wsDisconnect) {
          socket.close();
          socket = null
        }
      }

      next(action);
    };
  };
};

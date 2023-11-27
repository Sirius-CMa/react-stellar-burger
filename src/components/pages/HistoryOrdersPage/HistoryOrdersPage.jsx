import styles from "./HistoryOrdersPage.module.css";

import { NavBlockProfile } from "Components/NavBlockProfile";

// import { v4 as uuid } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectWsFeed, disconnectWsFeed } from "Action/ws";
import { getDataFeed } from "Selectors";
import { OrderElement } from "Components/OrderElement";
import { connectWsProfileFeed, disconnectWsProfileFeed } from "Action/wsProfileFeed";
import { getDataProfileFeed } from "Selectors";

const url = "wss://norma.nomoreparties.space/orders/all";
const url2 = "wss://norma.nomoreparties.space/orders"; // ?token=${accessToken}
// Для обращения по сокет-соединению используйте только токен, без Bearer.

export function HistoryOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(connectWsFeed(url));
    dispatch(connectWsProfileFeed(url2));
    return () => {
      // dispatch(disconnectWsFeed());
      dispatch(disconnectWsProfileFeed());
    };
  }, [dispatch]);

  const { data } = useSelector(getDataProfileFeed);
  if (!data) return null;

  // let doneOrders = data.orders.filter((obj) => obj.status === "done").slice(0, 5);
  // let orderInProgress = data.orders.filter((obj) => obj.status !== "done").slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.ii}>
        <NavBlockProfile />
      </div>

      <div className={styles.ww}>
        <ul className={styles.feed}>{data && data.orders.map((card) => <OrderElement card={card} />)}</ul>
      </div>
    </div>
  );
}

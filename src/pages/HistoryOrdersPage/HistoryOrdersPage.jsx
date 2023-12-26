import styles from "./HistoryOrdersPage.module.css";

import { NavBlockProfile } from "Components/NavBlockProfile";

// import { v4 as uuid } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { OrderElement } from "Components/OrderElement";
import { connectWsProfileFeed, disconnectWsProfileFeed } from "Action/wsProfileFeed";
import { getDataProfileFeed } from "Selectors";
import { urlOrdersFeedProfile } from "Utils/constants";

export function HistoryOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWsProfileFeed(urlOrdersFeedProfile));
    return () => {
      dispatch(disconnectWsProfileFeed());
    };
  }, [dispatch]);

  const { data } = useSelector(getDataProfileFeed);
  if (!data) return null;

  return (
    <>
      <ul className={styles.feed}>{data && data.orders.map((card, index) => <OrderElement card={card} index={index} />)}</ul>
    </>
  );
}

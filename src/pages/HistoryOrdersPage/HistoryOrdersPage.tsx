import styles from "./HistoryOrdersPage.module.css";

import { useEffect } from "react";
import { OrderElement } from "Components/OrderElement";
import { connectWsProfileFeed, disconnectWsProfileFeed } from "Action/wsProfileFeed";
import { getDataProfileFeed } from "../../redux/Selectors";
import { urlOrdersFeedProfile } from "Utils/constants";
import { TOrder, useAppDispatch, useAppSelector } from "../../typesData";

export function HistoryOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connectWsProfileFeed(urlOrdersFeedProfile));
    return () => {
      dispatch(disconnectWsProfileFeed());
    };
  }, [dispatch]);

  const { data } = useAppSelector(getDataProfileFeed);
  if (!data.success) return null;

  return (
    <>
      <ul className={styles.feed}>{data && data.orders.map((card: TOrder) => <OrderElement card={card} />)}</ul>
    </>
  );
}

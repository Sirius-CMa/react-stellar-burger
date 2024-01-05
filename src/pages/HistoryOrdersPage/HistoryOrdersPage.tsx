import styles from "./HistoryOrdersPage.module.css";

import { useEffect } from "react";
import { OrderElement } from "Components/OrderElement";
import { connectWsProfileFeed, disconnectWsProfileFeed } from "Action/wsProfileFeed";
import { selectProfileDataFeed } from "../../redux/Selectors";
import { urlOrdersFeedProfile } from "Utils/constants";
import { useAppDispatch, useAppSelector } from "../../typesData";

export function HistoryOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connectWsProfileFeed(urlOrdersFeedProfile));
    return () => {
      dispatch(disconnectWsProfileFeed());
    };
  }, [dispatch]);

  // const orders = useAppSelector(selectProfileDataFeed2);
  const data = useAppSelector(selectProfileDataFeed);
  if (!data?.success) return null;

  return (
    <>
      <ul className={styles.feed}>{data && data.orders.map((card) => <OrderElement card={card} />)}</ul>
    </>
  );
}

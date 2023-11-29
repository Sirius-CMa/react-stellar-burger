import styles from "./FeedOrdersPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectWsFeed, disconnectWsFeed } from "Action/ws";
import { getDataFeed } from "Selectors";
import { OrderElement } from "Components/OrderElement";
import { urlOrdersFeed } from "Utils/constants";

export function FeedOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWsFeed(urlOrdersFeed));
    return () => dispatch(disconnectWsFeed());
  }, [dispatch]);

  const { data } = useSelector(getDataFeed);
  if (!data) return null;

  let doneOrders = data.orders.filter((obj) => obj.status === "done").slice(0, 5);
  let orderInProgress = data.orders.filter((obj) => obj.status !== "done").slice(0, 5);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.dataBlock}>
        <ul className={styles.feed}>
          {data.orders.map((card, index) => (
            <OrderElement card={card} index={index} />
          ))}
        </ul>
        <div className={styles.ordersData}>
          <div className={`${styles.ordersInfo} mb-15`}>
            <p className="text text_type_main-medium">Готовы:</p>
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={styles.orderList}>
              {doneOrders &&
                doneOrders.map((card, index) => (
                  <li key={index} className="text text_type_digits-default mb-2">
                    0{card.number}
                  </li>
                ))}
            </ul>
            <ul className={styles.orderListReady}>
              {orderInProgress.length === 0 ? (
                <li key={101} className="text text_type_main-small">
                  Все текущие заказы готовы!
                </li>
              ) : (
                orderInProgress &&
                orderInProgress.map((card, index) => (
                  <li key={102} className="text text_type_digits-default mb-2">
                    0{card.number}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className={`${styles.numBox} mb-15`}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${styles.number} text text_type_digits-large`}>{data.total}</p>
          </div>
          <div className={styles.numBox}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.number} text text_type_digits-large`}>{data.totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

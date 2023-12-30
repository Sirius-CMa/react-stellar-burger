import styles from "./OrderView.module.css";

import { OrderDataFeed } from "Components/OrderDataFeed";

export function OrderView() {
  return (
    <div className={styles.container}>
      <OrderDataFeed notPopup />
    </div>
  );
}

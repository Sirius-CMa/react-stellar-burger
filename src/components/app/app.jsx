import styles from "./app.module.css";
import { data } from "../../utils/data";
//import Layout from "../layout/layout";
import Header from "../header/header";

function App() {
  return (
    <div className={styles.app}>
      <Header/>
    </div>
  );
}

export default App;

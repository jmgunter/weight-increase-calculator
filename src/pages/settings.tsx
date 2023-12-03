import Header from "@/components/Header";
import React from "react";
import styles from "@/styles/Settings.module.css";

export default function settings() {
  return (
    <div>
      {/* <Header /> */}
      <div className={styles.container}>
        <div className={`${styles.gridItem} ${styles.header}`}>Header</div>
        <div className={`${styles.gridItem} ${styles.sideBar}`}>
          Sidebar <p>another</p>
        </div>
        <div className={styles.gridItem}>Content</div>
        <div className={`${styles.gridItem} ${styles.footer}`}>Footer</div>
      </div>
    </div>
  );
}

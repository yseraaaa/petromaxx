import React from "react";
import styles from "./AssignBranch.module.css";

const AssignBranch = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Assign Branch</h2>
      <p className={styles.description}>Manage branch assignments here.</p>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="branchName" className={styles.label}>Branch Name</label>
          <input id="branchName" type="text" placeholder="Enter branch name" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="branchManager" className={styles.label}>Branch Name</label>
          <input id="branchManager" type="text" placeholder="Enter branch name" className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Assign</button>
      </form>
    </div>
  );
};

export default AssignBranch;

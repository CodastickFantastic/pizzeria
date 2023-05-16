"use client";

import Link from "next/link";
import styles from "@/styles/header.module.scss";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "@/redux/actions/userStateSlice";
import { FaShoppingCart, FaUserAlt, FaSignInAlt } from "react-icons/fa";

export default function UserButtonsSection() {
  const User = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(logout())
  }
  return (
    <>
      {!User.token && (
        <>
          <Link href="/register">
            <FaSignInAlt className={styles.icon} />
            <p>Zarejestruj</p>
          </Link>
          <Link href="/login">
            <FaUserAlt className={styles.icon} />
            <p>Zaloguj</p>
          </Link>
        </>
      )}
      {User.token && (
        <>
          <Link href="/cart">
            <FaShoppingCart className={styles.icon} />
            <p>Koszyk</p>
          </Link>
          <div className={styles.user_icon}>
            <FaUserAlt className={styles.icon} />
            <p>Test Testowski</p>
            <div className={styles.user_actions}>
              <div className={styles.arrow_up} />
              <div className={styles.buble}>
                <Link href="/account">Moje Konto</Link>
                <p onClick={handleLogout}>Wyloguj</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

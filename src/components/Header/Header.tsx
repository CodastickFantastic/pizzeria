import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/header.module.scss";
import Logo from "/public/images/logo.webp";
import UserButtonsSection from "./UserButtonsSection";

export default function Header() {
  return (
    <>
      <div className={styles.top_bar}>
        <p>Promocja na wszystkie pizze z kodem &quot;pizza_is_love&quot;</p>
      </div>
      <div className={`${styles.menu} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo - smakowity kawałek pizzy"
              width={60}
              height={60}
            />
          </Link>
        </div>
        <div className={styles.center}>
          <ul>
            <li>
              <Link href="/about-us">O nas</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/promotions">Promocje</Link>
            </li>
            <li>
              <Link href="/contact">Konta</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <UserButtonsSection />
        </div>
      </div>
    </>
  );
}

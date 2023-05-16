"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/register.module.scss";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/userStateSlice";

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const response = await fetch("/api/authentication/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const User = await response.json();

    if (User.error) {
      setError(User.error);
      return;
    } else {
      dispatch(login(User));
      router.push("/");
    }
  };

  return (
    <form method="POST" onSubmit={handleLogin} className={styles.register}>
      <h1>Zarejestruj się</h1>
      {error && <p className={styles.error}>{error}</p>}

      <label htmlFor="name">Imię</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Hasło</label>
      <input type="password" id="password" name="password" />
      <label htmlFor="password2">Powtórz hasło</label>
      <input type="password" id="password2" name="password2" />
      <button type="submit">Zarejestruj</button>
      <p>
        Posiadasz już konto? <Link href="/login">Zaloguj się!</Link>
      </p>
    </form>
  );
}

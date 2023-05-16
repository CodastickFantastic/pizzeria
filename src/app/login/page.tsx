"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/register.module.scss";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/userStateSlice";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await fetch("/api/authentication/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const User = await response.json();

    if (User.error) {
      setError(User.error);
      return;
    } else {
      dispatch(login(User));
      router.push("/");
    }
  }

  return (
    <form method="POST" onSubmit={handleLogin} className={styles.register}>
      <h1>Zaloguj się</h1>
      {error && <p className={styles.error}>{error}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Hasło</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Zaloguj</button>
      <p>
        Nie posiadasz jeszcze konta? <Link href="/register">Zarejestruj się!</Link>
      </p>
    </form>
  );
}

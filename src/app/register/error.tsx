'use client';
import { use, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
    useEffect(() => {
        console.log("dupa");
    }, [error]);
}

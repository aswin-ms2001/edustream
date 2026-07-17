"use client";

import * as React from "react";
import { useAppDispatch } from "@/store/hooks";
import { restoreSessionThunk } from "@/store/features/auth/authThunk";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    dispatch(restoreSessionThunk());
  }, [dispatch]);

  return null;
}

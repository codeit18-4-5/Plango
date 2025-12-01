"use client";

import { useEffect } from "react";
import { useToast } from "@/providers/toast-provider";

export default function ArticleEditToast() {
  const { showToast } = useToast();
  useEffect(() => {
    setTimeout(() => {
      const editToastMsg = sessionStorage.getItem("articleEditToast");
      if (editToastMsg) {
        sessionStorage.removeItem("articleEditToast");
        showToast(editToastMsg, "success");
      }
    }, 120);
  }, [showToast]);
  return null;
}


import styles from "@/styles/containerPage.module.scss";
import type { Metadata } from "next";

// Используем dynamic для отключения SSR:
import dynamic from 'next/dynamic';
const Transaction = dynamic(() => import('@/components/Transaction/Transaction'), { ssr: false });


export const metadata: Metadata = {
  title: "Отправь токены",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default function TransactionPage() {
  return (
    <div className={styles.container}>
      <Transaction />
    </div>
  )
}



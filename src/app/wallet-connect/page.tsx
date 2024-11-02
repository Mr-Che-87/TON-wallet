import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
//используем dynamic для отключения SSR у WalletConnect (хотя он вроде итак клиентский):
import dynamic from "next/dynamic";
const WalletConnect = dynamic(() => import("@/components/WalletConnect/WalletConnect"), { ssr: false });


export const metadata: Metadata = {
  title: "Привяжи кошелёк",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default function WalletConnectPage() {
  return (
    <div className={styles.container}>
      <WalletConnect />
    </div>
  );
}

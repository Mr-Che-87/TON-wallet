"use client";

import styles from "./WalletConnect.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import { fetchBalance } from '../../app/api/apiService'; 
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

//import { TonConnect } from '@tonconnect/sdk';
//const tonConnect = new TonConnect();


export default function WalletConnect() {
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const router = useRouter(); 

  useEffect(() => {
    if (wallet) {
      const walletAddress = wallet.account.address;
      setAddress(walletAddress);
      console.log("Полученный адрес кошелька:", walletAddress); // Лог адреса кошелька
      loadBalance(walletAddress);
    }
  }, [wallet]);

  const loadBalance = async (walletAddress: string) => {
    const balance = await fetchBalance(walletAddress);
    setBalance(balance);
    console.log("Баланс получен:", balance); // Лог баланса
  };

  const handleNavigate = () => {
    router.push('/transaction');
  };

  return (
    <div className={styles.container}>
      Страница подключения кошелька
      <header>
        <TonConnectButton />
        {/* <p>Баланс: {balance} TON</p> */}
      </header>
      <main>
        <p>Баланс: {balance} TON</p>
        <p>Адрес: {address || "кошелёк не подключён"}</p>
        <button onClick={handleNavigate}>Перейти к транзакциям</button>
      </main>
    </div>
  );
}

"use client";

import styles from "./Transaction.module.scss";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchBalance } from '../../app/api/apiService'; 
import { useTonWallet } from '@tonconnect/ui-react';

//import { TonConnect } from '@tonconnect/sdk';
//const tonConnect = new TonConnect();

export default function Transaction() {
  const wallet = useTonWallet();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet) {
      loadBalance(wallet.account.address);
    }
  }, [wallet]);

  const loadBalance = async (walletAddress: string) => {
    const balance = await fetchBalance(walletAddress);
    setBalance(balance);
    console.log("Баланс получен в Transaction компоненте:", balance); // Лог баланса
  };

  const handleSend = async () => {
    if (!wallet) {
      alert('Пожалуйста, подключите кошелёк.');
      return;
    }

    try {
      alert(`Перевод ${amount} TON на адрес ${recipient} выполнен успешно.`);
      router.push('/');
    } catch (error) {
      alert('Ошибка при выполнении транзакции.');
    }
  };

  const handleNavigate = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      Страница транзакций
      <header>
        <button onClick={handleNavigate}>Назад</button>
        <p>Баланс: {balance} TON</p>
      </header>
      <main>
        <input
          type="text"
          placeholder="Количество TON"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Адрес получателя"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button onClick={handleSend}>Отправить</button>
      </main>
    </div>
  );
}

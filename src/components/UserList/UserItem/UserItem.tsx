"use client";

import styles from "./UserItem.module.scss"; 
import { IUser } from "@/types/IUser";
import { useRouter } from "next/navigation"; 

interface UserItemProps {
  user: IUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const router = useRouter(); 

  const handleDetailClick = () => {
    router.push(`/user-profile/${user.id}`); //роутинг
  };

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <ul>
          <li>
            <h3>ФИО:</h3>
            <div className={styles.userField}>{user.username} {user.name}</div>
          </li>
          <li>
            <h3>Город:</h3>
            <div className={styles.userField}>{user.address?.city}</div>
          </li>
          <li>
            <h3>Компания:</h3>
            <div className={styles.userField}>{user.company?.name}</div>
          </li>
        </ul>
      </div>

      <div className={styles.userDetail}>
        <button className={styles.btnDetail} onClick={handleDetailClick}>Подробнее</button>
      </div>
    </div>
  );
};

export default UserItem;
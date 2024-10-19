"use client";

import styles from "./UserList.module.scss"; 
import UserItem from "./UserItem/UserItem"; 
import { useEffect, useState, useMemo } from "react";
//import { fetchGetUsers } from "@/app/api/apiService";
//import { IUser } from "@/types/IUser"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, filterByName, sortByCity, sortByCompany } from "@/store/usersSlice";
import { RootState, AppDispatch } from "@/store/store";
import declensionText  from "@/utils/declensionText";  //функция склонения существительного


export default function UserList() {
  const dispatch: AppDispatch = useDispatch();
  const { users, filteredUsers, searchTerm } = useSelector((state: RootState) => state.users); //данные из store
  const [loading, setLoading] = useState(true); //прелоадер

  //Подгружаем список юзеров из store(API подключается внутри слайса):
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers());
      setLoading(false); //выключаем прелоадер после загрузки
    };
    fetchData();
  }, [dispatch]);

  //Хэндлер для поиска по имени:
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByName(e.target.value));
  };

  //Мемоизация отфильтрованных пользователей:
  const memoizedUsers = useMemo(() => filteredUsers, [filteredUsers]);

  return (
    <div className={styles.container}>

      <div className={styles.leftContainer}>
        <div className={styles.sortContainer}>
          <h2 className={styles.sortTitle}>Сортировка:</h2>
          <div className={styles.sortGroupBtn}>
            <button 
              className={styles.sortBtn} 
              onClick={() => dispatch(sortByCity())}
            >
              по городу
            </button>
            <button 
              className={styles.sortBtn} 
              onClick={() => dispatch(sortByCompany())}
            >
              по компании
            </button>
          </div>
        </div>
        <div className={styles.searchNameContainer}>
          <h2 className={styles.searchNameTitle}>Поиск по имени:</h2>
          <input
            className={styles.searchNameInput}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Введите имя"
          />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <h1>Список пользователей</h1>
        {loading ? ( <div className={styles.preloader}>Загрузка...</div> ) 
        : (
        <>
          <div className={styles.usersContainer}>
            {memoizedUsers.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          <div className={styles.userCount}>
            Найдено {declensionText(filteredUsers.length)}
          </div>
        </>
        )}
      </div>
    </div>
  );
}


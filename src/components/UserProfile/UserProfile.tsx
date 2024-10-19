"use client";

import styles from "./UserProfile.module.scss";
import { useEffect, useState } from "react";
import { IUser } from "@/types/IUser";
import { fetchGetUserById, patchUpdateUser } from "@/app/api/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser, updateUser } from "@/store/userDataSlice";
import { useRouter } from "next/navigation"; 
import { userProfileSchema } from "./validation"; //схема валидации от yup 
import { ValidationError } from "yup";

interface EditUserProps {
  userId: string;
}

const UserProfile: React.FC<EditUserProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); //данные из store
  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>({});  //обновление данных юзера
  const [loading, setLoading] = useState(true); //прелоадер
  const [isEditing, setIsEditing] = useState(false); //переключатель режима редактирования
  const [errors, setErrors] = useState<Record<string, string>>({}); //стейт ошибок валидации

  const router = useRouter(); 
  const handleBackToListClick = () => {
    router.push(`/user-list`); //роутинг
  };

  useEffect(() => {
    const fetchUser = async () => {
      const savedUser = localStorage.getItem(`user_${userId}`); //забираем данные из localStorage
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUpdatedUser(parsedUser);
        dispatch(setUser(parsedUser)); //направляем данные из localStorage в store
      } else {
        const fetchedUser: IUser | null = await fetchGetUserById(userId); //если localStorage - берём из API
        if (fetchedUser) {
          dispatch(setUser(fetchedUser));
          setUpdatedUser(fetchedUser);
        }
      }
      setLoading(false); 
    };

    fetchUser();
  }, [userId, dispatch]);


  //Хэндлер для изменения полей:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setUpdatedUser((prev) => {
      const currentAddress = prev.address || { street: "", city: "", zipcode: "" };
      if (name === "street" || name === "city" || name === "zipcode") {
        return {
          ...prev,
          address: {
            ...currentAddress,
            [name]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  
    //удаляем ошибку, если косяки при вводе данных исправлены:
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "street" || name === "city" || name === "zipcode") {
        delete newErrors[`address.${name}`];
      } else if (name in newErrors) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };


  //Хэндлер для блокировки символов (всех, кроме вышеуказанных):
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { key } = e;
  
    const allowedSymbolsRegex = /^[\d\s\-_()+]*$/; //допустимые символы для phone и zipcode
  
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"]; //разрешённые клавиши навигации
      if (allowedKeys.includes(key)) {
      return; 
    }

    if ((name === "phone" || name === "zipcode") && !allowedSymbolsRegex.test(key)) {
      e.preventDefault(); //блок
    }
  };
  

  //Хэндлер сохранения:
  const handleEditClick = async () => {
    if (isEditing) {  //клик на кнопку "Сохранить" (режим редактирования)
      try {
        await userProfileSchema.validate(updatedUser, { abortEarly: false });  //проверка валидации yup

        const updatedData = await patchUpdateUser(userId, updatedUser);
        if (updatedData) {
          //Обновляем данные в store:
          dispatch(updateUser(updatedUser));
          //Сохраняем данные в localStorage:
          localStorage.setItem(`user_${userId}`, JSON.stringify({ ...user, ...updatedUser }));
          //Выводим данные в консоль:
          console.log("Новые данные юзера:", { ...user, ...updatedUser });

          setIsEditing(false);  //если всё ок, переключаем режим редактирования
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          const validationErrors: Record<string, string> = {};
          error.inner.forEach((err) => {
            if (err.path) {
              validationErrors[err.path] = err.message;  //выводим сообщение об ошибке
            }
          });
          setErrors(validationErrors); //загружаем ошибку в стейт
        
          return;  //!!пустой вывод, чтобы кнопка не переключалась после клика, если есть ошибка
        }
      }
    } else {   //клик на кнопку "Сохранить" (спящий режим)
      setIsEditing(true);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
         {/* убрал. зачем сортировка на странице конкретного юзера? */}
      </div>

      <div className={styles.rightContainer}>
        <h1>Профиль пользователя</h1>
        {loading ? ( <div className={styles.preloader}>Загрузка...</div> ) 
        : (
        <>
        <div className={styles.userDataContainer}>
          <div className={styles.inputDataBlock}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors.name ? styles.errorInput : ""}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedUser.username || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors.username ? styles.errorInput : ""}
            />
            {errors.username && <p className={styles.errorText}>{errors.username}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="м"
              name="email"
              value={updatedUser.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={updatedUser.address?.street || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors["address.street"] ? styles.errorInput : ""}
            />
             {errors["address.street"] && <p className={styles.errorText}>{errors["address.street"]}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={updatedUser.address?.city || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors["address.city"] ? styles.errorInput : ""}
            />
             {errors["address.city"] && <p className={styles.errorText}>{errors["address.city"]}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="zipcode">Zip code</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={updatedUser.address?.zipcode || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={!isEditing}
              className={errors["address.zipcode"] ? styles.errorInput : ""}
            />
             {errors["address.zipcode"] && <p className={styles.errorText}>{errors["address.zipcode"]}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={updatedUser.phone || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={!isEditing} 
              className={errors.phone ? styles.errorInput : ""}
            />
              {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={updatedUser.website || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={errors.website ? styles.errorInput : ""}
            />
            {errors.website && <p className={styles.errorText}>{errors.website}</p>}
          </div>

          <div className={styles.inputDataBlock}>
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              id="comment"
              value={updatedUser.comment || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button className={styles.backToListBtn} onClick={handleBackToListClick}>
            Назад к списку
          </button>
          <button 
            className={`${styles.editBtn} ${isEditing ? styles.saveBtn : ""}`}
            onClick={handleEditClick}
          >
            {isEditing ? "Сохранить" : "Редактировать"}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
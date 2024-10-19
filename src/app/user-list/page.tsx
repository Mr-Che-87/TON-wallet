import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
import UserList from "@/components/UserList/UserList";

export const metadata: Metadata = {
  title: "Cписок пользователей",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default function UserListPage() {
  return (
    <div className={styles.container}>
      <UserList />
    </div>
  )
}


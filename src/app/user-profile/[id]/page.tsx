import styles from "@/styles/containerPage.module.scss";
import type { Metadata } from "next";
import UserProfile from "@/components/UserProfile/UserProfile";

export const metadata: Metadata = {
  title: "Профиль пользователя",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className={`${styles.container} ${styles.containerStart}`}>
      <UserProfile userId={params.id} />
    </div>
  );
}


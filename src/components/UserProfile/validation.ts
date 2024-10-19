import * as yup from 'yup';

//Схема валидации (обязательность, пустые поля+формат email, телефона и индекса):
export const userProfileSchema = yup.object().shape({
  name: yup.string().required('Поле Имя обязательно для заполнения'),
  username: yup.string().required('Поле Имя пользователя обязательно для заполнения'),
  email: yup
    .string()
    .email('Неверный формат email')
    .required('Поле Email обязательно для заполнения'),
  phone: yup
    .string()
    .matches(/^[\d\s\-_()+]*$/, 'Телефон содержит недопустимые символы')
    .required('Поле Телефон обязательно для заполнения'),
  address: yup.object().shape({
    street: yup.string().required('Поле Улица обязательно для заполнения'),
    city: yup.string().required('Поле Город обязательно для заполнения'),
    zipcode: yup
      .string()
      .matches(/^[\d\s\-_()+]*$/, 'Индекс содержит недопустимые символы')
      .required('Поле Индекс обязательно для заполнения'),
  }),
  website: yup.string().required('Поле Сайт обязательно для заполнения'),
});

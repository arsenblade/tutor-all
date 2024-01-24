import {Link, useNavigate} from 'react-router-dom';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import {Routes} from 'shared/config/routerConfig';
import Select from 'shared/ui/Select/Select';
import {FormEvent, useCallback, useState} from 'react';
import styles from './Registration.module.scss';
import {TypeUserInterface} from './Registration.types';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {authActions} from 'entities/User';

const USER_TYPES: TypeUserInterface[] = [
  {
    value: 'teacher',
    name: 'Преподаватель',
  },
  {
    value: 'student',
    name: 'Ученик',
  },
];

export default function Registration() {
    const actionsAuth = useActionCreatorsTyped(authActions);

    const [typeUser, setTypeUser] = useState<TypeUserInterface>({
        value: 'teacher',
        name: 'Преподаватель',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        actionsAuth.registration({email, password, name: '', roles: [typeUser.value], avatar: ''}).then(() => {
            navigate('/');
        });
    }, [email, password]);

  const handleChangeTypeUser = useCallback((item: TypeUserInterface) => {
    setTypeUser(item);
  }, []);

  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <h1 className={styles.title}>
        Регистрация
      </h1>

      <Select
        items={USER_TYPES}
        currentValue={typeUser}
        onChangeCurrentValue={handleChangeTypeUser}
      />

      <CustomInput
        type="email"
        placeholder="Email"
        className={styles.field}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <CustomInput
        type="password"
        placeholder="Пароль"
        className={styles.field}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <CustomInput
        type="password"
        placeholder="Повторите пароль"
        className={styles.field}
        value={forgotPassword}
        onChange={(event) => setForgotPassword(event.target.value)}
      />

      <div className={styles.containerButton}>
        <Button color="Violet">
          Зарегистрироваться
        </Button>

        <Link className={styles.linkLogin} to={Routes.LOGIN_ROUTE}>
          Войти
        </Link>
      </div>
    </form>
  );
}

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {Routes} from 'shared/config/routerConfig';
import styles from './Login.module.scss';
import {FormEvent, useCallback, useState} from 'react';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {authActions} from 'entities/User';

export default function Login() {
  const actionsAuth = useActionCreatorsTyped(authActions);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      actionsAuth.login({email, password}).then((response) => {
          // @ts-ignore
          const errorText = response.payload?.response?.data?.message;

          if (errorText) {
              setErrorText('Пользователь не найден');
          } else {
              navigate('/');
          }
      }).finally(() => {
          setIsLoading(false);
      });
  }, [email, password]);

  return (
    <form className={styles.login} onSubmit={handleSubmit} onClick={() => setErrorText('')}>
      <h1 className={styles.title}>
        Авторизация
      </h1>

      {errorText ? (
        <div className={styles.errorText}>
          {errorText}
        </div>
        ) : null}

      <CustomInput
        type="email"
        className={styles.field}
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <CustomInput
        type="password"
        className={styles.field}
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className={styles.containerButton}>
        <Button color="Violet" isLoading={isLoading}>
          Войти
        </Button>

        <Link className={styles.linkRegister} to={Routes.REGISTER_ROUTE}>
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
}

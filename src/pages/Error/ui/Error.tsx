import classNames from 'classnames';
import Button from 'shared/ui/Button/Button';
import styles from './Error.module.scss';

interface ErrorPagePropsInterface {
    className?: string;
}

export default function ErrorPage({className}: ErrorPagePropsInterface) {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <p>Произошла непредвиденная ошибка</p>
      <Button onClick={reloadPage} color="Violet">
        Обновить страницу
      </Button>
    </div>
  );
}

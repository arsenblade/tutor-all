import styles from './LinkPanel.module.scss';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

interface LinkPanelPropsInterface {
    link: string
    title: string
    description?: string
    imgPath?: string
    isBorderImg?: boolean
}

export default function LinkPanel({link, imgPath, title, description, isBorderImg}: LinkPanelPropsInterface) {
    return (
      <Link
        className={classNames(styles.linkPanel, {
            [styles.linkPanelWithImage]: imgPath,
        })}
        to={link}
      >
        {imgPath ? (
          <img
            className={classNames(styles.imagePanel, {
              [styles.isBorder]: isBorderImg,
          })}
            src={imgPath}
            draggable={false}
          />
          ) : null}
        <div className={styles.conentPanel}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <svg className={styles.iconPanel} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z" />
        </svg>
      </Link>
    );
}

import styles from './AdvantagesStudent.module.scss';
import classNames from 'classnames';

interface AdvantagesStudentPropsInterface {

}

export default function AdvantagesStudent({}: AdvantagesStudentPropsInterface) {
    return (
      <div className={styles.advantagesTeachers}>
        <h1 className={styles.title}>
          Все, что тебе нужно для подготовки, <span className={styles.subTitle}>— на одной птлаформе</span>
        </h1>

        <section className={styles.advantageCards}>
          <article className={classNames(styles.advantageCard, styles.advantageCardPrimary)}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Легко найдешь нужного преподователя</h2>
              <p className={styles.description}>
                Найдите преподавателя и станьте его учеником в один клик. Вы можете обучаться у нескольких преподавателей одновременно, расширяя свои знания и навыки. Простота и удобство выбора обучающих программ делает процесс обучения более эффективным.
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/Testing.png"
              alt=""
            />
          </article>

          <article className={classNames(styles.advantageCard, styles.advantageCardSecondary)}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Уникальное обучение, подходящее именно вам.</h2>
              <p className={styles.description}>
                Ученики могут выбирать преподавателей и программы обучения, соответствующие их потребностям и интересам, что способствует более эффективному и приятному обучению.
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/Testing.png"
              alt=""
            />
          </article>

          <article className={styles.advantageCard}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Обучение в удобное для вас время.</h2>
              <p className={styles.description}>
                Ученики могут выбирать удобное время для занятий с учителями, что помогает согласовать обучение с другими обязанностями и занятиями. Гибкость в расписании способствует комфортному и продуктивному процессу обучения.              
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/Testing.png"
              alt=""
            />
          </article>
        </section>

        <section className={styles.info}>
          <h2 className={styles.titleInfo}>Удобная образовательная платформа</h2>

          <div className={styles.infoCards}>
            <article className={classNames(styles.infoCard, styles.infoCardPrimary)}>
              <div className={styles.content}>
                <h2 className={styles.titleCard}>Комфортно учиться из любой точки мира, с любого устройства</h2>
                <p className={styles.description}>
                  с компьютера, телефона, планшета — главное, чтобы был интернет
                </p>
              </div>

              <img
                className={styles.imageInfo}
                src="/images/Testing.png"
                alt=""
              />
            </article>

            <article className={classNames(styles.infoCard, styles.infoCardStandart)}>
              <div className={styles.content}>
                <h2 className={styles.titleCard}>На платформе есть:</h2>
                <p className={styles.description}>
                  уроки, практические занятия и все нужные материалы для подготовки к экзамену
                </p>
              </div>

              <img
                className={styles.imageInfo}
                src="/images/Testing.png"
                alt=""
              />
            </article>
          </div>
        </section>
      </div>
    );
}

import styles from './AdvantagesTeachers.module.scss';
import classNames from 'classnames';

interface AdvantagesTeachersPropsInterface {

}

export default function AdvantagesTeachers({}: AdvantagesTeachersPropsInterface) {
    return (
      <div className={styles.advantagesTeachers}>
        <h1 className={styles.title}>
          Все, что тебе нужно для обучения людей, <span className={styles.subTitle}>— на одной платформе</span>
        </h1>

        <section className={styles.advantageCards}>
          <article className={styles.advantageCard}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Заполняй свой профиль учителя и добавляй к себе учеников</h2>
              <p className={styles.description}>
                Создание и настройка профиля занимает всего 5 минут. Привлекайте и добавляйте учеников легко. Опишите ваш опыт и образование. Гибкость в управлении вашим профилем позволяет быстро настраивать параметры в соответствии с вашими предпочтениями.
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/edit-profile.png"
              alt=""
            />
          </article>

          <article className={classNames(styles.advantageCard, styles.advantageCardSecondary)}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Составляй и задавай домашнее задание ученикам</h2>
              <p className={styles.description}>
                Создавайте и сохраняйте домашнее задание в свой профиль легко. Отправляйте его ученикам всего в один клик. Эффективное управление домашними заданиями сокращает временные затраты и облегчает коммуникацию между учителем и учеником.
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/create-homework.png"
              alt=""
            />
          </article>

          <article className={classNames(styles.advantageCard, styles.advantageCardPrimary)}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Смотри статистику своих учеников в удобном для тебя формате</h2>
              <p className={styles.description}>
                Отслеживайте прогресс своих учеников в удобном формате. Получайте статистику о выполненных заданиях, оценках и прогрессе в обучении, помогая каждому студенту достичь успеха.              
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/statistic.png"
              alt=""
            />
          </article>
        </section>

        <section className={styles.info}>
          <h2 className={styles.titleInfo}>Удобная образовательная платформа</h2>

          <div className={styles.infoCards}>
            <article className={classNames(styles.infoCard, styles.infoCardStandart)}>
              <div className={styles.content}>
                <h2 className={styles.titleCard}>На платформе есть:</h2>
                <p className={styles.description}>
                  уроки, практические занятия и все нужные материалы для подготовки к экзамену
                </p>
              </div>

              <img
                className={styles.imageInfo}
                src="/images/student-lessons.png"
                alt=""
              />
            </article>

            <article className={classNames(styles.infoCard, styles.infoCardPrimary)}>
              <div className={styles.content}>
                <h2 className={styles.titleCard}>Комфортно обучай из любой точки мира, с любого устройства</h2>
                <p className={styles.description}>
                  с компьютера, телефона, планшета — главное, чтобы был интернет
                </p>
              </div>

              <img
                className={styles.imageInfo}
                src="/images/all-platform.png"
                alt=""
              />
            </article>
          </div>
        </section>
      </div>
    );
}

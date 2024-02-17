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
                Создание и настройка профиля занимает всего 5 минут. Привлекайте и добавляйте учеников легко. Опишите ваш опыт и образование, укажите расписание и доступность для учеников. Гибкость в управлении вашим профилем позволяет быстро настраивать параметры в соответствии с вашими предпочтениями и обстоятельствами.
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
              <h2 className={styles.titleCard}>Составляй и задавай домашнее задание ученикам</h2>
              <p className={styles.description}>
                Создавайте и сохраняйте домашнее задание в свой профиль легко. Отправляйте его ученикам всего в один клик. Эффективное управление домашними заданиями сокращает временные затраты и облегчает коммуникацию между учителем и учеником.
              </p>
            </div>

            <img
              className={styles.image}
              src="/images/Testing.png"
              alt=""
            />
          </article>

          <article className={classNames(styles.advantageCard, styles.advantageCardPrimary)}>
            <div className={styles.content}>
              <h2 className={styles.titleCard}>Эффективно планируй своё личное расписание</h2>
              <p className={styles.description}>
                Легко и быстро составляйте и корректируйте свое расписание. Эффективное управление временем позволяет легко вносить изменения и адаптировать расписание в соответствии с вашими потребностями и предпочтениями, обеспечивая гибкость в планировании занятий.
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

            <article className={classNames(styles.infoCard, styles.infoCardPrimary)}>
              <div className={styles.content}>
                <h2 className={styles.titleCard}>Комфортно обучай из любой точки мира, с любого устройства</h2>
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
          </div>
        </section>
      </div>
    );
}

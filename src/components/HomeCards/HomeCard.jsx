import css from './HomeCards.module.css';

function HomeCard({ title, description }) {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{title}</h3>
      <div className={css.line} />
      <p className={css.description}>{description}</p>
    </div>
  );
}

export default HomeCard;

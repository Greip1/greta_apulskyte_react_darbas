import css from './HomeCards.module.css';

function HomeCard({ title, description }) {
  return (
    <div className={css.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default HomeCard;

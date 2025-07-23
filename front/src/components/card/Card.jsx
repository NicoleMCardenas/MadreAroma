import styles from "./Card.module.css";

const Card = ({ text, image, delay = 0 }) => {
  return (
<article
  className={styles.card}
  style={{
    backgroundImage: `url(${image})`,
    animationDelay: `${delay}s`,
  }}
  role="region"
  aria-label="Tarjeta informativa sobre café"
>
      <div className={styles.overlay}>
<p
  className={styles.text}
  dangerouslySetInnerHTML={{ __html: text }}
/>
      </div>
    </article>
  );
};

export default Card;
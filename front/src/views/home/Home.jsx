import cardStyles from "../../components/card/Card.module.css"
import styles from "./Home.module.css"
import Card from "../../components/card/Card";
import textCard from "../../helpers/textCard";
import { useState } from "react";
const Home = () => {
    const [textCardToShow, setTextCardToShow] = useState(textCard);
    return (
        <div className={styles.homeContainer}>
<h3 className={styles.sectionTitle}>Inmersión al mundo del café</h3>
      <div className={cardStyles.cardsContainer}>
        {textCardToShow.map((item, index) => (
        <Card key={index} text={item.text} image={item.image} delay={index*0.2}/>
    ))}
      </div>
    </div>
  );
};
export default Home;
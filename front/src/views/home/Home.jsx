import Card from "../../components/card/Card";
import textCard from "../../helpers/textCard";
import { useState } from "react";

const Home = () => {
    const [textCardToShow, setTextCardToShow] = useState(textCard);
    return (
<div>
    <h3>Bienvenid@</h3>
    {textCardToShow.map((item, index) => (
        <Card key={index} text={item.text} image={item.image}/>
    ))}
</div>
    );
};
export default Home;
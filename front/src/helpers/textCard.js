import cbean from "../assets/cbean.svg";
import c_molido from "../assets/c_molido.png";
import ccosecha from "../assets/ccosecha.webp";
const textCard= [ 
    {
           text: `
      <strong>⚙️ Molido Personalizado</strong>
      <p>Preparamos tu café con el molido perfecto según tu método de extracción favorito. Espresso, prensa francesa, V60... tú eliges, nosotros lo ajustamos a la perfección.</p>
    `,
        image: c_molido
    },
    {
    text: `
      <strong>🌱 Mezcla Personalizada</strong>
      <p>¿Prefieres un sabor suave, intenso o afrutado? Creamos mezclas únicas según tu perfil de gusto.</p>
    `,
        image: cbean,
    },
    {
    text: `
      <strong>☕ Grano de Cosecha Familiar</strong>
      <p>Seleccionamos granos de café cultivados en fincas familiares con tradición y respeto por la tierra.</p>
    `,
        image: ccosecha,
    },
];
export default textCard;

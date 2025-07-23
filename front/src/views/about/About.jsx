import styles from "./About.module.css";

const About = () => {
  const imagesAndData1 = [
    {
      src: "https://img.icons8.com/fluent/512/node-js.png",
      alt: "Node JS",
      href: "https://nodejs.org/en",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
      alt: "TypeScript",
      href: "https://www.typescriptlang.org/",
    },
    {
      src: "https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png",
      alt: "Express.js",
      href: "https://expressjs.com/",
    },
    {
      src: "https://vectorseek.com/wp-content/uploads/2024/07/TypeORM-Logo-Vector-Logo-Vector.svg-.png",
      alt: "TypeORM",
      href: "https://typeorm.io/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
      alt: "PostgreSQL",
      href: "https://www.postgresql.org/",
    },
  ];

  const imagesAndData2 = [
    {
      src: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
      alt: "React",
      href: "https://es.react.dev/",
    },
    {
      src: "https://images.seeklogo.com/logo-png/29/3/react-router-logo-png_seeklogo-294311.png",
      alt: "React Router DOM",
      href: "https://reactrouter.com/en/main",
    },
    {
      src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/formik.svg",
      alt: "Formik",
      href: "https://formik.org/",
    },
  ];

  return (
    <div className={styles.aboutBackground}>
      <div className={styles.aboutContainer}>
        <div className={styles.textSection}>
          <h2>Sobre esta aplicación</h2>
          <h3>Proyecto Final - Módulo 3 | Henry</h3>
          <p><strong>Carrera:</strong> Desarrollo Full Stack</p>
          <p>
            Esta aplicación fue desarrollada con una arquitectura sólida y tecnologías modernas. El enfoque estuvo en lograr una buena experiencia de usuario y una estructura de código escalable y profesional.
          </p>
        </div>

        <div className={styles.logoGrid}>
          {imagesAndData1.map((image) => (
            <a
              key={image.alt}
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.techLogo}
            >
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </div>

        <div className={styles.logoGrid}>
          {imagesAndData2.map((image) => (
            <a
              key={image.alt}
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.techLogo}
            >
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
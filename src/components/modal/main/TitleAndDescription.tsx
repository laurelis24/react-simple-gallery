import styles from '../../../style.module.css';

interface TitleAndDescriptionProps {
  title: string;
  description: string;
  position: number;
}

export default function TitleAndDescription({ position, title, description }: TitleAndDescriptionProps) {
  return (
    <section key={position} className={styles['title-and-description']}>
      {title && <h4>{title}</h4>}
      {description && <small>{description}</small>}
    </section>
  );
}

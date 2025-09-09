import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import styles from '../../../style.module.css';
import { MyState } from '../../../types/types';
import ExitButton from '../../buttons/ExitButton';
import FullScreenButton from '../../buttons/FullScreenButton';
import ImageCounter from './ImageCounter';

interface ModalNavbarProps {
  state: MyState;
  refSlider: React.RefObject<HTMLDivElement | null>;
}

export default function ModalNavbar({ state, refSlider }: ModalNavbarProps) {
  const { onClose } = useImageGalleryContext();

  return (
    <div className={styles['nav-container']}>
      <div className={styles['left-container']}>
        <ImageCounter imagePosition={state.pos} />
      </div>
      <div className={styles['right-container']}>
        <FullScreenButton refSlide={refSlider} />
        <ExitButton handleClose={() => onClose(state.pos - 1)} />
      </div>
    </div>
  );
}

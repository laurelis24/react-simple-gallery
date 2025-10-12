import useImageGalleryContext from '../../../hooks/useImageGalleryContext';
import styles from '../../../style.module.css';
import { Theme } from '../../../types/types';
import ExitButton from '../../buttons/ExitButton';
import FullScreenButton from '../../buttons/FullScreenButton';
import ThemeButton from '../../buttons/ThemeButton';
import ThumbnailNavigationButton from '../../buttons/ThumnailNavigationButton';
import ImageCounter from './ImageCounter';

interface ModalNavbarProps {
  refSlider: React.RefObject<HTMLDivElement | null>;
  position: number;
  isThumbnailNavigation: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  onToggleThumbnailNavigation: (value: boolean) => void;
}

function ModalNavbar({
  refSlider,
  position,
  isThumbnailNavigation,
  theme,
  onToggleTheme,
  onToggleThumbnailNavigation,
}: ModalNavbarProps) {
  const { fullScreenButton, sliderThumbnail, sliderTheme, sliderIndex, onClose } = useImageGalleryContext();

  const handleToggleThumbnailNavigation = () => {
    onToggleThumbnailNavigation(!isThumbnailNavigation);
  };
  return (
    <div className={styles['nav-container']}>
      <div className={styles['left-container']}>{sliderIndex && <ImageCounter imagePosition={position} />}</div>
      <div className={styles['right-container']}>
        {fullScreenButton && <FullScreenButton refSlider={refSlider} />}
        {sliderThumbnail && <ThumbnailNavigationButton onToggleThumbnailNavigation={handleToggleThumbnailNavigation} />}
        {sliderTheme && <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />}
        <ExitButton handleClose={() => onClose(position - 1)} />
      </div>
    </div>
  );
}

export default ModalNavbar;

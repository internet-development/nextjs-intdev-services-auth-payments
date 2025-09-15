import styles from '@system/modals/Modals.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import OutsideElementEvent from '@system/detectors/OutsideElementEvent';

import { ModalComponent } from '@root/system/modals/ModalContext';

const MODAL_WIDTH = 240;
const MODAL_GUTTER_OFFSET = 24;

export interface ModalNavigationProps {
  parentId?: string;
}

const FontOptions = [
  {
    children: 'AT Oroban™',
    onClick: () => Utilities.onHandleFontChange('font-use-at-oroban'),
  },
  {
    children: 'Commit Mono V143 [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-commit-mono'),
  },
  {
    children: 'Departure Mono [MIT]',
    onClick: () => Utilities.onHandleFontChange('font-use-departure-mono'),
  },
  {
    children: 'Fira Code [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-fira-code'),
  },
  {
    children: 'Fragment Mono [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-fragment-mono'),
  },
  {
    children: 'Geist Mono [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-geist-mono'),
  },
  {
    children: 'Geist Sans [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-geist-sans'),
  },
  {
    children: 'Geograph™',
    onClick: () => Utilities.onHandleFontChange('font-use-geograph-regular'),
  },
  {
    children: 'GT-America™',
    onClick: () => Utilities.onHandleFontChange('font-use-gt-america-regular'),
  },
  {
    children: 'GT-Zirkon™',
    onClick: () => Utilities.onHandleFontChange('font-use-gt-zirkon'),
  },
  {
    children: 'IBM Plex Mono [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-ibm-plex-mono'),
  },
  {
    children: 'IBM Plex Sans [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-ibm-plex-sans'),
  },
  {
    children: 'IBM Plex Serif [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-ibm-plex-serif'),
  },
  {
    children: 'Inter [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-inter-sans'),
  },
  {
    children: 'Iosevka Term [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-iosevka-term'),
  },
  {
    children: 'JetBrains Mono [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-jet-brains-mono'),
  },
  {
    children: 'Libre Caslon Condensed [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-libre-caslon-condensed'),
  },
  {
    children: 'Neue Haas Unica™',
    onClick: () => Utilities.onHandleFontChange('font-use-neue-haas-unica'),
  },
  {
    children: 'Open Sans [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-open-sans-regular'),
  },
  {
    children: 'Panama Mono™',
    onClick: () => Utilities.onHandleFontChange('font-use-panama-mono'),
  },
  {
    children: 'Public Sans [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-public-sans'),
  },
  {
    children: 'RT Alias Grotesk™',
    onClick: () => Utilities.onHandleFontChange('font-use-rt-alias-grotesk'),
  },
  {
    children: 'SFMono Square [FOSS]',
    onClick: () => Utilities.onHandleFontChange('font-use-sfmono-square'),
  },
  {
    children: 'Server Mono 0.0.6 [OFL]',
    onClick: () => Utilities.onHandleFontChange('font-use-server-mono'),
  },
  {
    children: 'Silvana™',
    onClick: () => Utilities.onHandleFontChange('font-use-silvana'),
  },
  {
    children: 'Söhne™',
    onClick: () => Utilities.onHandleFontChange('font-use-sohne-book'),
  },
  {
    children: 'Tiempos Text™',
    onClick: () => Utilities.onHandleFontChange('font-use-tiempos-text'),
  },
  {
    children: 'Times New Roman [OS]',
    onClick: () => Utilities.onHandleFontChange('font-use-times-new-roman'),
  },
  {
    children: 'TX-02 Berkeley Mono™',
    onClick: () => Utilities.onHandleFontChange('font-use-berkeley-mono'),
  },
  {
    children: 'Univers™',
    onClick: () => Utilities.onHandleFontChange('font-use-univers'),
  },
];

const ModalNavigation: ModalComponent<ModalNavigationProps> = (props) => {
  const style = Utilities.calculatePositionWithGutterById(props.parentId, MODAL_WIDTH, window.innerWidth, MODAL_GUTTER_OFFSET);

  return (
    <OutsideElementEvent className={styles.modal} onOutsideEvent={() => props.onClose()} style={{ textAlign: style.side as any, top: style.top, right: style.right }}>
      {FontOptions.map((each) => {
        return (
          <span className={styles.item} onClick={each.onClick}>
            {each.children}
          </span>
        );
      })}
    </OutsideElementEvent>
  );
};

export default ModalNavigation;

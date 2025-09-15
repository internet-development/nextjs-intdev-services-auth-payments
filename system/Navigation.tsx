import styles from '@system/Navigation.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import InternetDevelopmentLogoMark from '@components/InternetDevelopmentLogoMark';
import ModalAuthentication from '@system/modals/ModalAuthentication';
import ModalForgotPassword from '@system/modals/ModalForgotPassword';
import ModalNavigation from '@root/system/modals/ModalNavigation';

export default function Navigation(props) {
  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="https://internet.dev" className={styles.item}>
          <InternetDevelopmentLogoMark height="16px" />
        </a>
      </section>
      <section className={styles.stretch}>
        {props.viewer ? null : (
          <span className={styles.item} id="site-auth-button" onClick={() => props.modals.open(ModalAuthentication)}>
            Sign in
          </span>
        )}
        {props.viewer ? null : (
          <span className={styles.item} id="site-forgot-button" onClick={() => props.modals.open(ModalForgotPassword)}>
            Reset
          </span>
        )}
        <span className={styles.item} onClick={() => Utilities.onHandleThemeChange()}>
          Theme
        </span>
        <span
          className={styles.item}
          id="site-navigation-button"
          onClick={() => props.modals.open(ModalNavigation, { parentId: 'site-navigation-button' })}
          data-detector-ignore-navigation
        >
          Fonts
        </span>
      </section>
    </nav>
  );
}

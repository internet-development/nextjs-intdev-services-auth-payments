import styles from '@system/modals/Modals.module.scss';

import * as Queries from '@common/queries';
import * as React from 'react';
import * as Utilities from '@common/utilities';

import ActionItem from '@system/ActionItem';
import Apple from '@root/system/svg/social/Apple';
import Bluesky from '@system/svg/social/Bluesky';
import Button from '@system/Button';
import Cookies from '@modules/cookies';
import Google from '@system/svg/social/Google';
import ModalAuthentication from '@system/modals/ModalAuthentication';
import Input from '@system/Input';
import OutsideElementEvent from '@system/detectors/OutsideElementEvent';

import { FormHeading, FormSubHeading, FormParagraph, InputLabel } from '@system/typography/forms';
import { ModalComponent, useModals } from '@root/system/modals/ModalContext';

export interface ModalAuthenticationProps {
  active?: string;
  viewer: any | null;
}

const ModalForgotPassword: ModalComponent<ModalAuthenticationProps> = (props) => {
  const [email, setEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const modals = useModals();

  if (props.viewer) {
    return (
      <div className={styles.wrapper}>
        <OutsideElementEvent onOutsideEvent={() => props.onClose()} style={{ width: '100%', maxWidth: 488, margin: `0 auto 0 auto` }}>
          <div className={styles.childModal} style={{ width: '100%', padding: 24 }}>
            <FormSubHeading>You are authenticated</FormSubHeading>
            <FormParagraph>To clear your session, click on the button below.</FormParagraph>
            <Button
              loading={loading}
              onClick={async () => {
                const confirm = window.confirm('Are you sure?');
                if (!confirm) {
                  return;
                }

                Cookies.remove('sitekey');
                window.location.reload();
              }}
              style={{ marginTop: 24, width: '100%' }}
            >
              Sign out
            </Button>
          </div>
        </OutsideElementEvent>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <OutsideElementEvent onOutsideEvent={() => props.onClose()} style={{ width: '100%', maxWidth: 488, margin: `0 auto 0 auto` }}>
        <div className={styles.childModal} style={{ width: '100%', padding: 24 }}>
          <FormSubHeading>Forgot password</FormSubHeading>
          <FormParagraph>Enter your e-mail and we'll send you a link to reset your password.</FormParagraph>
          <InputLabel style={{ marginTop: 24 }}>E-mail</InputLabel>
          <Input onChange={(e) => setEmail(e.target.value)} name="email" style={{ marginTop: 8 }} type="text" placeholder="Your e-mail" value={email} />

          <div style={{ marginTop: 24 }}>
            <ActionItem icon={`⭢`} onClick={() => modals.open(ModalAuthentication)}>
              Sign in instead
            </ActionItem>
          </div>

          <Button
            loading={loading}
            onClick={async () => {
              setLoading(true);
              const response = await Queries.onPublicUserForgotPassword({ email });
              if (!response) {
                setLoading(false);
                alert('Something went wrong. This is also a lazy message. Ideally the error message would have told you that you forgot to put your email or password.');
                return;
              }

              window.location.reload();
            }}
            style={{ marginTop: 24, width: '100%' }}
          >
            Get new password
          </Button>
        </div>
      </OutsideElementEvent>
    </div>
  );
};

export default ModalForgotPassword;

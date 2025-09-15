import styles from '@components/PageSectionUpgrade.module.scss';

import * as Constants from '@common/constants';
import * as React from 'react';
import * as Queries from '@common/queries';

import ActionItem from '@system/ActionItem';
import Button from '@system/Button';
import Cookies from '@modules/cookies';
import Input from '@system/Input';
import ModalAuthentication from '@system/modals/ModalAuthentication';

import { FormHeading, FormParagraph } from '@system/typography/forms';
import { H5, SubTitle } from '@system/typography';
import { useModals } from '@root/system/modals/ModalContext';

export default function PageSectionUpgrade(props) {
  const modals = useModals();

  return (
    <>
      {props.viewer ? (
        <header className={styles.header}>
          <FormHeading>Welcome back</FormHeading>
          <FormParagraph style={{ marginTop: 6 }}>You are signed in.</FormParagraph>
          <br />
          <div>
            <ActionItem icon={`⭢`} href={props.stripeAddPaymentURL}>
              Add a payment method to your account
            </ActionItem>
            <ActionItem
              icon={`⊹`}
              onClick={async () => {
                const confirm = window.confirm('Are you sure you want to send us $10 dollars?');
                if (!confirm) {
                  return;
                }

                const response = await Queries.onSendAmountCents({ amount: 1000, key: props.sessionKey });
                if (!response) {
                  alert('Payment failed');
                  return;
                }

                alert('Thank you! You have sent us $10 dollars. We really appreciate it');
                console.log(response);
              }}
            >
              Send us $10 dollars (LIVE)
            </ActionItem>
          </div>
          {props.method ? <FormParagraph>Current payment method ends in {props.method.card.last4}</FormParagraph> : null}.
        </header>
      ) : (
        <header className={styles.header}>
          <FormHeading>Welcome</FormHeading>
          <FormParagraph style={{ marginTop: 6 }}>Sign in or create an account to gain increased access to our APIs and other services as they become available.</FormParagraph>
        </header>
      )}
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles.content}>
              <SubTitle style={{ padding: 0 }}>Free</SubTitle>
              <H5 style={{ marginTop: 24 }}>
                $0 USD<span className={styles.subtle}>/mo</span>
              </H5>
              {props.viewer ? (
                <Button visual style={{ height: 48, marginTop: 24, width: '100%' }}>
                  Already obtained
                </Button>
              ) : (
                <Button style={{ height: 48, marginTop: 24, width: '100%' }} onClick={() => modals.open(ModalAuthentication)}>
                  Sign up
                </Button>
              )}
              <div className={styles.hiddenCaption}>All the benefits of "Life", and ↴</div>
              <div>
                <div>Access to all free APIs, products, and games.</div>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.content}>
              <SubTitle style={{ padding: 0 }}>Professional</SubTitle>
              <H5 style={{ marginTop: 24 }}>
                $8.99 USD<span className={styles.subtle}>/mo</span>
              </H5>
              {props.viewer ? (
                props.viewer.level >= Constants.Users.tiers.PAYING ? (
                  <Button visual style={{ height: 48, marginTop: 24, width: '100%' }}>
                    Already obtained
                  </Button>
                ) : (
                  <Button href={`${Constants.LINKS.PAYING}?prefilled_email=${props.viewer.email}`} style={{ height: 48, marginTop: 24, width: '100%' }} target="_blank">
                    Get started
                  </Button>
                )
              ) : (
                <Button style={{ height: 48, marginTop: 24, width: '100%' }} onClick={() => modals.open(ModalAuthentication)}>
                  Sign up to upgrade
                </Button>
              )}
              <div className={styles.caption}>
                All the benefits of <strong>"Free"</strong>, and ↴
              </div>
              <div>
                <div>{Constants.Payouts.PAYING.toLocaleString()} credits deposited every month.</div>
                <div>Send credits to other users.</div>
                <div>Access to all professional APIs, products, and games.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.subRow}>
          <div className={styles.subRowContent}>
            <div className={styles.disclaimer}>
              [1] By uploading data through our service, you consent to our{' '}
              <a href="https://txt.dev/wwwjim/intdev-terms-of-service" className={styles.link} target="_blank">
                Terms of Service
              </a>
              ,{' '}
              <a href="https://txt.dev/wwwjim/intdev-privacy-policy" className={styles.link} target="_blank">
                Privacy Policy
              </a>
              , and{' '}
              <a href="https://txt.dev/wwwjim/intdev-acceptable-use" className={styles.link} target="_blank">
                Acceptable Use Policy
              </a>
              .
            </div>

            <div className={styles.disclaimer}>
              [2] This codebase is designed for starting new applications using the Internet Development Studio Company's service API. You can view the{' '}
              <a href="https://github.com/internet-development/nextjs-intdev-services-auth-payments" className={styles.link} target="_blank">
                source code
              </a>
              .
            </div>

            <div className={styles.disclaimer}>
              [3] Make sure you configure the AES environment variables, read the{' '}
              <a href="https://github.com/internet-development/nextjs-intdev-services-auth-payments/blob/main/common/server.ts#L8" className={styles.link} target="_blank">
                details
              </a>
              .
            </div>

            <div className={styles.disclaimer} style={{ paddingBottom: 128 }}>
              [4] If you work at the Internet Development Studio Company, make sure you configure the redirects in the{' '}
              <a href="https://github.com/internet-development/apis/blob/main/common/constants.ts" className={styles.link} target="_blank">
                constants.ts
              </a>{' '}
              file on the API.
            </div>

            {props.viewer ? (
              <>
                <Button
                  onClick={() => {
                    const confirm = window.confirm('Are you sure you want to sign out?');
                    if (!confirm) {
                      return;
                    }

                    Cookies.remove('sitekey');
                    window.location.reload();
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

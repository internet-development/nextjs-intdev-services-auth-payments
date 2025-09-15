import * as Constants from '@common/constants';
import * as React from 'react';
import * as Server from '@common/server';
import * as Queries from '@common/queries';
import * as Utilities from '@common/utilities';

import Button from '@system/Button';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import ModalAuthentication from '@system/modals/ModalAuthentication';
import Navigation from '@system/Navigation';
import Page from '@components/Page';
import PageSectionUpgrade from '@components/PageSectionUpgrade';
import ThinAppLayout from '@system/ThinAppLayout';

import { FormHeading, FormParagraph, InputLabel } from '@system/typography/forms';
import { useModals } from '@root/system/modals/ModalContext';

function ExampleAuthenticationPage(props) {
  const [currentUser, setUser] = React.useState<Record<string, any> | null>(props.viewer);
  const modals = useModals();

  console.log(props.method);

  const isVerified = props.viewer && Number(props.viewer.level) >= Constants.Users.tiers.VERIFIED;
  const isPaying = props.viewer && Number(props.viewer.level) >= Constants.Users.tiers.PAYING;
  const isOffice = props.viewer && Number(props.viewer.level) >= Constants.Users.tiers.GENERAL_CO_WORKING;
  const isPartner = props.viewer && Number(props.viewer.level) >= Constants.Users.tiers.PARTNER;
  const isAdmin = props.viewer && Number(props.viewer.level) >= Constants.Users.tiers.ADMIN;

  return (
    <Page
      title="nextjs-intdev-services-auth-payments"
      description="A front-end example for authentication, form elements, payments, and user settings"
      url="https://payments.internet.dev"
    >
      <Navigation modals={modals} viewer={currentUser} />

      <PageSectionUpgrade viewer={currentUser} stripeAddPaymentURL={props.stripeAddPaymentURL} method={props.method} sessionKey={props.sessionKey} />

      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);

  let url = null;
  let method = null;
  if (viewer) {
    const response = await Queries.onGetStripePaymentURL({ key: sessionKey });
    if (response && !Utilities.isEmpty(response.data)) {
      url = response.data;
    }

    const card = await Queries.onGetStripePaymentMethod({ key: sessionKey });
    if (card && card.data) {
      method = card.data;
    }
  }

  return {
    props: { method, sessionKey, viewer, stripeAddPaymentURL: url },
  };
}

export default ExampleAuthenticationPage;

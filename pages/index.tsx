import * as Constants from '@common/constants';
import * as React from 'react';
import * as Server from '@common/server';
import * as Queries from '@common/queries';
import * as Utilities from '@common/utilities';

import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';
import ThinAppLayout from '@system/ThinAppLayout';

import { FormHeading, FormParagraph, InputLabel } from '@system/typography/forms';
import { useModals } from '@root/system/modals/ModalContext';

function ExampleAuthenticationPage(props) {
  const [currentUser, setUser] = React.useState<Record<string, any> | null>(props.viewer);
  const modals = useModals();

  console.log(currentUser);

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
      <Navigation modals={modals} />

      <ThinAppLayout style={{ background: `var(--theme-background)`, borderTop: `1px solid var(--theme-border)` }}>
        <FormHeading>nextjs-intdev-services-auth-payments</FormHeading>
        <FormParagraph>A live example for authenticating against our API and testing functions used across all applications in a simple way.</FormParagraph>
      </ThinAppLayout>

      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);

  return {
    props: { sessionKey, viewer },
  };
}

export default ExampleAuthenticationPage;

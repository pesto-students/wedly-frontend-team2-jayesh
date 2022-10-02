import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <footer className="w-full absolute bottom-0 flex justify-between bg-white p-4">
      <section>
        <FormattedMessage
          {...messages.copyrightMessage}
        />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
        />
      </section>
    </footer>
  );
}

export default Footer;

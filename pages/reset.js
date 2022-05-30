import PropTypes from 'prop-types';

import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query?.token} />
    </div>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};

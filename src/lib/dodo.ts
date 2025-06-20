import DodoPayments from 'dodopayments';

const dodo = new DodoPayments({
  bearerToken: process.env.NODE_ENV == "production"? process.env.DODO_APIKEY: process.env.DODO_TEST_APIKEY,
  environment: process.env.NODE_ENV == "production"? "live_mode": "test_mode"
});

export default dodo;
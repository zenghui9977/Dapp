import truffle from '../../truffle-config.js';
const ENV = 'development';

const getEthereumUrl = (env) => {
  const network = truffle.networks[env];
  return `http://${network.host}:${network.port}`;
};

const config = {
  ethereumUrl: getEthereumUrl(ENV),
};

export default config;
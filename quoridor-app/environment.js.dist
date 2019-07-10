import { Constants } from "expo";

const ENV = {
  dev: {
    API_BASE_URL: "http://localhost:8383"
  },
  prod: {
    API_BASE_URL: "http://192.168.12.5:8383"
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;

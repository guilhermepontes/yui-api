const development = {
  server: {
    port: 5000,
    host: 'localhost'
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/yui_dev'
  }
};

export default process.env.NODE_ENV === 'dev' ? development : development;

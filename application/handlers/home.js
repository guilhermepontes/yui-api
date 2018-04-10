export const plugin = {
  name: 'home',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: () => ({
        message: 'Welcome to Yui!',
      }),
    });
  },
};
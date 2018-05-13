class Home {
  static register = [
    {
      method: 'GET',
      path: '/',
      handler: Home.hello,
      private: true,
    },
  ]

  static hello() {
    return {
      message: 'Welcome to Yui!',
    }
  }
}

export default Home;
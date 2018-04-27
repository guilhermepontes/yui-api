class Home {
  static register = [
    {
      method: 'GET',
      path: '/',
      handler: Home.hello,
    },
  ]

  static hello() {
    return {
      message: 'Welcome to Yui!',
    }
  }
}

export default Home;
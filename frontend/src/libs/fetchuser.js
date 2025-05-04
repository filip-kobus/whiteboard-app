  async function getUser() {
    try {
      const user = await getCurrentUser();
      const userId = user['userId'];
      userHasAuthenticated(true);
      setUserId(userId);
    } catch (err) {
      userHasAuthenticated(false);
      setUserId(null);
    } finally {
      setIsLoading(false);
    }
  }
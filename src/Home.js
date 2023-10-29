function Home({ currUser }) {
  return (
    <div>
      <h1>Welcome to ShareBnB!</h1>
      {currUser && <h2>{`Welcome back ${currUser.user.username}!`}</h2>}
    </div>
  );
}

export default Home;
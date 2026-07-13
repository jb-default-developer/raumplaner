import '../Home.css';

function Home() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    function logout() {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    }
    return (
        <div>
            <h1>Willkommen, {user.username}!</h1>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
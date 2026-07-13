import '../Home.css';
import Header from './Header.jsx';

function Home() {
    
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    function logout() {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    }
    return (
   
        <div>
            <Header onLogout={logout}></Header>
            <h1>Willkommen, {user.username}!</h1>
        </div>
    );
}

export default Home;
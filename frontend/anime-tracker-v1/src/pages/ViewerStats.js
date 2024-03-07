import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ViewerStats() {

    const location = useLocation(); // Use useLocation hook
    const animeList = location.state?.animeList; // Access animeList from location state
    const navigate = useNavigate();

    function goToHome() {
        navigate('/');
    }

    return (
        <div>

            <h1>Viewer Stats</h1>
            {/* Checks for error in displaying the # of animes we watched */}
            {animeList ? (
                <><p>Number of anime entries: {animeList.length}</p>
                {/* temporary list of anime to keep track of, sanity check for animeList */}
                <ul>
                    {animeList.map((anime) => (
                        <li key={anime.id}>{anime.name}</li>
                    ))}
                </ul></>
            ) : (
                <p>No anime data available</p>
            )}

            {/* Routes us back to the home page */}
            <Button variant="primary" className="mt-3" onClick={goToHome}>Go Back To Home</Button>
            {/* Additional content to display anime stats */}

        </div> // This is the end of content
    );
}

export default ViewerStats;
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import AnimeCard from '../components/AnimeCard';
import Button  from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import {Modal, Form, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {

    // Define state variables to store anime data and form input values
    const [animeList, setAnimeList] = useState([]);
    const [animeName, setAnimeName] = useState('');
    const [animeGenre, setAnimeGenre] = useState('');
    const [episodesWatched, setEpisodesWatched] = useState('');
    const [totalEpisodes, setTotalEpisodes] = useState('');
    // newly added image var
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // state variables for the search bar and handling searching, move to another js file
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    // handle page info to another page
    const navigate = useNavigate();
    // Fetch anime data from the server when the component mounts
    useEffect(() => {
        fetchAnime();
    }, []);

    // Function to fetch anime data from the server
    function fetchAnime() {
        axios.get('http://localhost:8080/anime/allAnimeEntries')
            .then(response => {
                console.log("Successfully fetched anime", response.data);
                // Sort anime list by ID
                const sortedAnimeList = response.data.sort((a, b) => a.id - b.id);
                setAnimeList(sortedAnimeList);
            })
            .catch(error => {
                console.error('Error fetching anime:', error);
            });
    }

    // Avoid bad user input for tracking episodes watched
    function validateEpisodeInput() {
        return episodesWatched <= totalEpisodes && episodesWatched >= 0 && totalEpisodes >= 0;
    }

    // Function to add new anime
    function addAnime() {
        if (animeName && animeGenre !== null && animeGenre !== undefined && validateEpisodeInput()) {
            const newAnime = {
                name: animeName,
                genre: animeGenre,
                episodesWatched: episodesWatched,
                totalEpisodes: totalEpisodes
            };
            axios.post('http://localhost:8080/anime/animeEntry', newAnime)
                .then(response => {
                    console.log(`Added Anime Entry: " ${newAnime.name} " with success`)
                    fetchAnime();
                    setAnimeName('');
                    setAnimeGenre('');
                    setEpisodesWatched(0);
                    setTotalEpisodes(0);
                    handleClose();
                })
                .catch(error => {
                    console.error('Error adding anime:', error);
                });
        } else {
            alert('Please fill out all fields correctly before adding an anime.');
        }
    }

    // Function to update anime entry
    const updateAnime = (updatedAnime) => {
        axios.put('http://localhost:8080/anime/update', updatedAnime)
        .then(response => {
            // Update the anime list while preserving the order
            setAnimeList(prevAnimeList => {
                return prevAnimeList.map(anime => {
                    if (anime.id === updatedAnime.id) {
                        return updatedAnime; // Update the specific anime entry
                    }
                    return anime; // Leave other anime entries unchanged
                });
            });
            console.log(`Updated anime you are watching: ${updatedAnime.name} `);
        })
        .catch(error => {
            console.error('Error updating anime you are watching:', error);
        });
    };

    // Function to delete anime
    function deleteAnime(id) {
        console.log(`Deleting anime: ID: ${id}`);
        axios.delete(`http://localhost:8080/anime/${id}`)
            .then(response => {
                if (response.status === 200) {
                    console.log("Deleted anime entry successfully")
                    fetchAnime(); // Refresh anime list after deleting anime
                }
            })
            .catch(error => {
                console.error('Error deleting anime:', error);
            });
    }

    // Function to search for anime to add and track, move to another js file
    const searchAnime = async (query, letter) => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=members&sort=desc&limit=15`);
            const resData = await res.json();
            setSearchResults(resData.data);
            console.log(resData.data)
        } catch (error) {
            console.error('Error searching anime:', error);
        }
    };


    const handleSearch = async () => {
        // Call searchAnime function only when searchTerm is not empty
        if (searchTerm.trim() !== '') {
          const firstLetter = searchTerm.charAt(0);
          await searchAnime(searchTerm, firstLetter);
        }
      };

    // Navigation

    function goToViewerStats() {
        // Pass animeList as state when navigating to ViewerStats
        navigate('/viewer-stats', { state: { animeList: animeList } });
    }
    function goToSearchPage() {
        navigate('/search');
    }

    return (
        <Container>
        {/* Your home page content here */}
        <h1>Welcome to the Home Page!</h1>
        {/* Use a button to navigate to ViewerStats */}
        <Button onClick={goToViewerStats}>Go to Viewer Stats</Button>
        <Button onClick={goToSearchPage}>Go to Search Page</Button>

        {/* Search bar for new anime */}
        <div>
      <input type="text" placeholder= "Search for an anime" value={searchTerm} onChange={handleSearchChange} />
      <button onClick={handleSearch}>Search</button>
      {/* Display search results */}
      
        </div>


         {/* Form to add new anime */}
        <h1>Add Anime Entry!</h1>
        
        {/*Overlay to add anime*/}
        <Button variant="primary" onClick={handleShow}>Add Anime</Button>
        <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Anime Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={animeName} onChange={e => setAnimeName(e.target.value)} placeholder="Name" required />
                        </Form.Group>
                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" value={animeGenre} onChange={e => setAnimeGenre(e.target.value)} placeholder="Genre" required />
                        </Form.Group>
                        <Form.Group controlId="formEpisodesWatched">
                            <Form.Label>Episodes Watched</Form.Label>
                            <Form.Control type="number" value={episodesWatched} onChange={e => setEpisodesWatched(e.target.value)} placeholder="Episodes Watched" required />
                        </Form.Group>
                        <Form.Group controlId="formTotalEpisodes">
                            <Form.Label>Total Episodes</Form.Label>
                            <Form.Control type="number" value={totalEpisodes} onChange={e => setTotalEpisodes(e.target.value)} placeholder="Total Episodes" required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addAnime}>Add Anime</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
        </Modal>
        <div>
            {/* Grid of User Anime Entries */}
            <h1>Animes That You Are Currently Watching!</h1>
            {/* <AnimeList animeList={animeList} updateAnime={updateAnime} deleteAnime={deleteAnime} /> */}
            <div className="anime-list">
                {animeList.map(anime => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime} // later on, anime will have an image url stored inside it
                        onUpdate={updateAnime}
                        onDelete={deleteAnime}
                    />
                ))}
            </div>
        </div>
        </Container> // end of content
    );
}

export default Home;
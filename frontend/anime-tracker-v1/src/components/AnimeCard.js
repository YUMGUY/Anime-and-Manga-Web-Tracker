import React, { useState }from 'react';
import { Card, Button, CardFooter,CardBody} from 'react-bootstrap';
import '../css/AnimeCard.css';
import { Form, Dropdown } from 'react-bootstrap';
import tsubasa from '../images/tsubasadefault.jpg'; // default image

function AnimeCard({ anime, onUpdate, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnime, setEditedAnime] = useState(anime);

    const handleUpdate = () => {
        onUpdate(editedAnime); // Pass the edited anime data to onUpdate
        setIsEditing(false); // Hide the edit form
    };

    const handleDelete = () => {
        onDelete(anime.id); // Pass the anime ID to onDelete
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedAnime({ ...editedAnime, [name]: value });
    };

    const handleCancel = () => {
        setEditedAnime(anime); // Reset the edited anime to the original values
        setIsEditing(false); // Hide the edit form
    };

    return (
        <Card className="anime-card">
        <Card.Img src={tsubasa} className="anime-card-image" />
        <Card.ImgOverlay>

        {/* Whether or not the anime edit form is displayed */}
        {!isEditing ? (
            /* Anime Information Displayed When Hovered On The Card */
            <div className="anime-card-hover-content">
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#fff' }}></div>
                <div><strong>Genre:</strong> {anime.genre}</div>
                <div><strong>Progress:</strong> {anime.episodesWatched} out of {anime.totalEpisodes} episodes</div>
                
                <div className="anime-card-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        ⚙️
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsEditing(true)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        ) : (
            <div className="anime-card-form-overlay">
                
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={editedAnime.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" value={editedAnime.genre} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formEpisodesWatched">
                        <Form.Label>Episodes Watched</Form.Label>
                        <Form.Control type="number" name="episodesWatched" value={editedAnime.episodesWatched} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formTotalEpisodes">
                        <Form.Label>Total Episodes</Form.Label>
                        <Form.Control type="number" name="totalEpisodes" value={editedAnime.totalEpisodes} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate}>Save</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </Form>
    
            </div>
        )}
    </Card.ImgOverlay>
    {/* Footer separate from the image */}
    <CardBody>
        <CardFooter className="anime-card-footer">
          <div>{anime.name}</div>
        </CardFooter>
    </CardBody>

    </Card>
);
}

export default AnimeCard;
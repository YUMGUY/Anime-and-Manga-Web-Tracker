package com.developer.animetracker.service;

import com.developer.animetracker.entity.*;
import java.util.List;
import java.util.Optional;

public interface AnimeService {
	List<Anime> getAllAnimes();
	Optional<Anime> getAnime(Long id);
	Anime saveAnime(Anime anime);
	Anime updateAnime(Anime anime);
	void deleteAnime(Long id);
}

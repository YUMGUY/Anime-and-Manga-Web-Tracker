package com.developer.animetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.developer.animetracker.entity.Anime;

import com.developer.animetracker.repository.*;

import java.util.Optional;
@Service
public class DefaultAnimeService implements AnimeService {
	
	private final AnimeRepository animeRepository;
	
	public DefaultAnimeService(AnimeRepository animeRepository) {
		this.animeRepository = animeRepository;
	}
	
	@Override
	public List<Anime> getAllAnimes() {
		return animeRepository.findAll();
	}

	@Override
	public Optional<Anime> getAnime(Long id) {
		return animeRepository.findById(id);
	}

	@Override
	public Anime saveAnime(Anime anime) {
		return animeRepository.save(anime);
	}

	@Override
	public Anime updateAnime(Anime anime) {
		Optional<Anime> existingAnime = animeRepository.findById(anime.getId());
		if(existingAnime.isPresent()) {
			Anime updatedAnime = existingAnime.get();
			updatedAnime.setName(anime.getName());
			updatedAnime.setGenre(anime.getGenre());
			updatedAnime.setEpisodesWatched(anime.getEpisodesWatched());
			updatedAnime.setTotalEpisodes(anime.getTotalEpisodes());
			return animeRepository.save(updatedAnime);
		}
		
		 else {
		        // Handle the case where the anime with the provided ID doesn't exist
		        throw new IllegalArgumentException("Anime with id " + anime.getId() + " not found");
		    }
	}

	@Override
	public void deleteAnime(Long id) {
		animeRepository.deleteById(id);
	}

}

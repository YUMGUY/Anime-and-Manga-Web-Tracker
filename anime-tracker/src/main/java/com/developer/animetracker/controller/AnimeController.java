package com.developer.animetracker.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.developer.animetracker.entity.Anime;
import com.developer.animetracker.service.AnimeService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/anime")
public class AnimeController {
	private final AnimeService animeService;
	
	public AnimeController(AnimeService animeService) {
		this.animeService = animeService;
	}
	
	@GetMapping("/allAnimeEntries")
	public List<Anime> getAllAnimes() {
		return animeService.getAllAnimes();
	}
	
	@GetMapping("/{id}")
	public Optional<Anime> getAnime(@PathVariable("id") Long id) {
		return animeService.getAnime(id);
	}
	
	// creating anime entry
	@PostMapping("/animeEntry")
	public Anime saveAnime(@RequestBody Anime anime) {
		return animeService.saveAnime(anime);
	}
	// updating anime entry
	@PutMapping("/update")
	public Anime updateAnime(@RequestBody Anime anime) {
		return animeService.updateAnime(anime);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAnime(@PathVariable("id") Long id) {
		animeService.deleteAnime(id);
	}
}

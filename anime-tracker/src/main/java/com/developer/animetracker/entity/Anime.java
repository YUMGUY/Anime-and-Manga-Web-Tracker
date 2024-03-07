package com.developer.animetracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name= "animes")
public class Anime {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "anime_id")
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "genre")
	private String genre;
	
	@Column(name = "episodesWatched")
	private Long episodesWatched;
	
	@Column(name = "totalEpisodes")
	private Long totalEpisodes;
	
	@Column(name = "imageUrl")
	private String imageUrl;
	
	Anime() {
		
	}
	
	Anime(String name, String genre, Long episodesWatched, Long totalEpisodes, String imageUrl) {
		this.name = name;
		this.genre = genre;
		this.episodesWatched = episodesWatched;
		this.totalEpisodes = totalEpisodes;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Long getEpisodesWatched() {
		return episodesWatched;
	}

	public void setEpisodesWatched(Long episodesWatched) {
		this.episodesWatched = episodesWatched;
	}

	public Long getTotalEpisodes() {
		return totalEpisodes;
	}

	public void setTotalEpisodes(Long totalEpisodes) {
		this.totalEpisodes = totalEpisodes;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	
}

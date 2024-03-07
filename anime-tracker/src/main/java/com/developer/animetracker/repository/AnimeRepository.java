package com.developer.animetracker.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.developer.animetracker.entity.Anime;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

}

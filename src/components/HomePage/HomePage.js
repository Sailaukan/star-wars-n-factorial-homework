import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./HomePage.module.css";
import supabase from "../../client";
import Card from "../Card/card";

const HomePage = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [starWarsDataPlanets, setStarWarsDataPlanets] = useState();
    const [urlPlanets, setUrlPlanets] = useState(
        `https://swapi.dev/api/planets/`
    );

    useEffect(() => {
        axios.get(urlPlanets).then((response) => {
            setStarWarsDataPlanets(response.data);
            setLoading(false);
        });
    }, [urlPlanets]);

    const allPlanetsOnPage = starWarsDataPlanets?.results.map((planet) => {
        return (
            <div key={planet.url} onClick={() => openModal(planet.url)}>
                <Card
                    type="Planet"
                    name={planet.name}
                    text1={planet.climate}
                    text2={planet.terrain}
                    text3={planet.population}
                    url={planet.url}
                />
            </div>
        );
    });

    useEffect(() => {
        axios.get(urlPlanets).then((response) => {
            setStarWarsDataPlanets(response.data);
            setLoading(false);
        });
    }, [urlPlanets]);

    function openModal(url) {
        setModalOpen(true);
        setSelectedCard(url);
    }

    function nextPlanetPage() {
        setLoading(true);
        setUrlPlanets(starWarsDataPlanets.next);
    }

    function previousPage() {
        setLoading(true);
        setUrlPlanets(starWarsDataPlanets.previous);
    }

    return (
        <div className={classes.mainWrapper}>
            {modalOpen ? (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <Card url={selectedCard} className={classes.modalContent} />
                    </div>
                </div>
            ) : null}
            <main className={classes.mainContent}>
                <h1 className={classes.title}>StarWikis</h1>
                <section className={classes.section}>
                    <h2 className={classes.sectionTitle}>Planets</h2>
                    <div className={classes.pageButtons}>
                        <button
                            onClick={previousPage}
                            className={classes.pageButton}
                            disabled={!starWarsDataPlanets?.previous}
                        >
                            ⏪
                        </button>
                        <button
                            onClick={nextPlanetPage}
                            className={classes.pageButton}
                            disabled={!starWarsDataPlanets?.next}
                        >
                            ⏩
                        </button>
                    </div>
                    <div className={classes.cardGrid}>
                        {allPlanetsOnPage}
                    </div>
                </section>
                <section className={classes.section}>
                    <h2 className={classes.sectionTitle}>Characters</h2>
                    <div className={classes.cardGrid}>
                        <div className={classes.card}>
                            <span>Name</span>
                            <span className={classes.likeCount}>❤️2</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;

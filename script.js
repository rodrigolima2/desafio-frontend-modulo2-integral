const body = document.querySelector('body');
const movies = document.querySelector('.movies');
const input = document.querySelector('.input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnTheme = document.querySelector('.btn-theme');

let listController = 0;

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR').then(res => {
    const promiseBody = res.json();

    promiseBody.then(body => {
        const removeMovie = document.querySelector('.movie');
        removeMovie.parentNode.removeChild(removeMovie);

        body.results.forEach((filme, index) => {
            addMovie(filme, index);
        });

        modal();
    });
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(res => {
    const promiseBody = res.json();

    promiseBody.then(body => {
        const backdropPath = document.createElement('img');
        const highlightVideo = document.querySelector('.highlight__video');
        const highlightTitle = document.querySelector('.highlight__title');
        const highlightRating = document.querySelector('.highlight__rating');
        const highlightGenres = document.querySelector('.highlight__genres');
        const highlightLaunch = document.querySelector('.highlight__launch');
        const highlightDescription = document.querySelector('.highlight__description');
        const genres = [];
        const releaseDate = body.release_date.split('-');

        for (i = 0; i < body.genres.length; i++) {
            genres[i] = body.genres[i].name;
        }

        const genresStr = genres.join(', ');

        if (releaseDate[1] == 1) releaseDate[1] = 'Janeiro';
        if (releaseDate[1] == 2) releaseDate[1] = 'Fevereiro';
        if (releaseDate[1] == 3) releaseDate[1] = 'Março';
        if (releaseDate[1] == 4) releaseDate[1] = 'Abril';
        if (releaseDate[1] == 5) releaseDate[1] = 'Maio';
        if (releaseDate[1] == 6) releaseDate[1] = 'Junho';
        if (releaseDate[1] == 7) releaseDate[1] = 'Julho';
        if (releaseDate[1] == 8) releaseDate[1] = 'Agosto';
        if (releaseDate[1] == 9) releaseDate[1] = 'Setembro';
        if (releaseDate[1] == 10) releaseDate[1] = 'Outubro';
        if (releaseDate[1] == 11) releaseDate[1] = 'Novembro';
        if (releaseDate[1] == 12) releaseDate[1] = 'Dezembro';

        backdropPath.classList.add('highlight__img');

        backdropPath.src = body.backdrop_path;
        backdropPath.alt = 'Capa do video';
        highlightTitle.textContent = body.title;
        highlightRating.textContent = body.vote_average;
        highlightGenres.textContent = genresStr;
        highlightLaunch.textContent = `/ ${releaseDate[2]} de ${releaseDate[1]} de ${releaseDate[0]}`;
        highlightDescription.textContent = body.overview;

        highlightVideo.prepend(backdropPath);
    });
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(res => {
    const promiseBody = res.json();

    promiseBody.then(body => {
        const highlightVideoLink = document.querySelector('.highlight__video-link');
        const key = body.results[0].key;

        highlightVideoLink.href = `https://www.youtube.com/watch?v=${key}`;
    });
});

input.addEventListener('keydown', (event) => {
    const movie = document.querySelectorAll('.movie');

    if (event.key !== 'Enter') return;

    if (input.value === '') {
        for (i = 0; i < movie.length; i++) {
            if (i > 19) {
                movie[i].remove();
            }
        }

        for (i = 0; i < movie.length; i++) {
            if (i >= 0 && i < 5) {
                movie[i].classList.remove('hidden');
            }
        }

        listController = 0;

        return;
    }

    const inputValue = event.target.value.trim().toLowerCase();

    for (i = 0; i < movie.length; i++) {
        if (i > 19) {
            movie[i].remove();
        }
    }

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${inputValue}`).then(res => {
        const promiseBody = res.json();

        promiseBody.then(body => {
            body.results.forEach((filme, index) => {
                for (i = 0; i < movie.length; i++) {
                    if (i < 20) {
                        movie[i].classList.add('hidden');
                    }
                }

                addMovie(filme, index);
            });

            modal(movie);
            listController = 4;
        });
    });
});

btnPrev.addEventListener('click', () => {
    const movie = document.querySelectorAll('.movie');
    const lengthInicial = 20;

    if (listController === 0) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 15 && i < lengthInicial) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController = 3;
    } else if (listController === 3) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 10 && i < 15) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    } else if (listController === 2) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 5 && i < 10) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    } else if (listController === 1) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 0 && i < 5) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    } else if (listController === 5) {
        for (i = 0; i < movie.length; i++) {
            if (i >= 20 && i < 25) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    } else if (listController === 6) {
        for (i = 0; i < movie.length; i++) {
            if (i >= 25 && i < 30) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    } else if (listController === 7) {
        for (i = 0; i < movie.length; i++) {
            if (i >= 30 && i < 35) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController--;
    }
});

btnNext.addEventListener('click', () => {
    const movie = document.querySelectorAll('.movie');
    const lengthInicial = 20;

    if (listController === 0) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 5 && i < 10) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController++;
    } else if (listController === 1) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 10 && i < 15) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController++;
    } else if (listController === 2) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 15 && i < 20) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController++;
    } else if (listController === 3) {
        for (i = 0; i < lengthInicial; i++) {
            if (i >= 0 && i < 5) {
                movies.children[i].classList.remove('hidden');
            } else {
                movies.children[i].classList.add('hidden');
            }
        }

        listController = 0;
    } else if (listController === 4) {
        if (movie.length > 25) {
            for (i = 0; i < movie.length; i++) {
                if (movie.length > 30) {
                    if (i >= 25 && i < 30) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                } else {
                    if (i >= 25 && i < movie.length) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                }
            }

            listController++;
        }
    } else if (listController === 5) {
        if (movie.length > 30) {
            for (i = 0; i < movie.length; i++) {
                if (movie.length > 35) {
                    if (i >= 30 && i < 35) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                } else {
                    if (i >= 30 && i < movie.length) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                }
            }

            listController++;
        }
    } else if (listController === 6) {
        if (movie.length > 35) {
            for (i = 0; i < movie.length; i++) {
                if (movie.length > 40) {
                    if (i >= 35 && i < 40) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                } else {
                    if (i >= 35 && i < movie.length) {
                        movies.children[i].classList.remove('hidden');
                    } else {
                        movies.children[i].classList.add('hidden');
                    }
                }
            }

            listController++;
        }
    }
});

btnTheme.addEventListener('click', () => {
    const backgroundNewColor = body.style.getPropertyValue('--background-color') === '#242424' ? '#FFFFFF' : '#242424';
    const inputNewColor = body.style.getPropertyValue('--input-color') === 'rgba(255, 255, 255, 0.7)' ? '#979797' : 'rgba(255, 255, 255, 0.7)';
    const subtitleNewColor = body.style.getPropertyValue('--subtitle-color') === '#FFFFFF' ? '#000000' : '#FFFFFF';
    const highlightInfoNewColor = body.style.getPropertyValue('--highlight-info-color') === '#454545' ? '#FFFFFF' : '#454545';
    const highlightGenreLaunchNewColor = body.style.getPropertyValue('--highlight__genre-launch-color') === 'rgba(255, 255, 255, 0.7)' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';

    btnTheme.src = btnTheme.src.includes('light-mode') ? './assets/dark-mode.svg' : './assets/light-mode.svg';
    btnPrev.src = btnPrev.src.includes('seta-esquerda-preta') ? './assets/seta-esquerda-branca.svg' : './assets/seta-esquerda-preta.svg';
    btnNext.src = btnNext.src.includes('seta-direita-preta') ? './assets/seta-direita-branca.svg' : './assets/seta-direita-preta.svg';

    body.style.setProperty('--background-color', backgroundNewColor);
    body.style.setProperty('--input-color', inputNewColor);
    body.style.setProperty('--subtitle-color', subtitleNewColor);
    body.style.setProperty('--highlight-info-color', highlightInfoNewColor);
    body.style.setProperty('--highlight__genre-launch-color', highlightGenreLaunchNewColor);
});

function addMovie(filme, index) {
    const addMovie = document.createElement('div');
    const poster = document.createElement('img');
    const movieInfo = document.createElement('div');
    const movieTitle = document.createElement('span');
    const movieRating = document.createElement('span');
    const estrela = document.createElement('img');
    const movieVote = document.createElement('span');

    addMovie.classList.add('movie');
    poster.classList.add('movie__poster');
    movieInfo.classList.add('movie__info');
    movieTitle.classList.add('movie__title');
    movieRating.classList.add('movie__rating');
    movieVote.classList.add('movie__vote');

    addMovie.id = filme.id;
    poster.src = filme.poster_path;
    poster.alt = 'Poster do Filme';
    movieTitle.textContent = filme.title;
    estrela.src = './assets/estrela.svg';
    estrela.alt = 'Estrela';
    movieVote.textContent = filme.vote_average;

    if (filme.title.length >= 9) {
        movieTitle.textContent = filme.title.substr(0, 9) + '...';
    }

    if (index > 4) {
        addMovie.classList.add('hidden');
    }

    movieRating.append(estrela, movieVote);
    movieInfo.append(movieTitle, movieRating);
    addMovie.append(poster, movieInfo);
    movies.append(addMovie);
}

function modal(removeEvent) {
    const movie = document.querySelectorAll('.movie');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    const modalImg = document.querySelector('.modal__img');
    const modalDescription = document.querySelector('.modal__description');
    const modalGenres = document.querySelector('.modal__genres');
    const modalAverage = document.querySelector('.modal__average');

    console.log(movie.length)
    movie.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', () => {
        const modalVote = document.querySelectorAll('.modal__vote');
        const modalGenre = document.querySelectorAll('.modal__genre');

        modal.classList.add('hidden');

        modalTitle.textContent = '';
        modalImg.src = '';
        modalDescription.textContent = '';
        modalGenre.forEach(item => item.remove());
        modalVote.forEach(item => item.remove());

        if (removeEvent) removeEvent.forEach(item => item.removeEventListener('click', openModal));
    });

    function openModal(event) {
        modal.classList.remove('hidden');

        fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${event.path[1].id}?language=pt-BR`).then(res => {
            const promiseBody = res.json();

            promiseBody.then(body => {
                const newGenre = [];
                const newVoteAverage = document.createElement('span');

                for (i = 0; i < body.genres.length; i++) {
                    newGenre[i] = document.createElement('span');
                    newGenre[i].classList.add('modal__genre');
                    newGenre[i].textContent = body.genres[i].name;

                    modalGenres.append(newGenre[i]);
                }

                newVoteAverage.classList.add('modal__vote');

                modalTitle.textContent = body.title;
                modalImg.src = body.backdrop_path;
                modalDescription.textContent = body.overview;
                newVoteAverage.textContent = body.vote_average;

                modalAverage.append(newVoteAverage);
            });
        });
    }
}
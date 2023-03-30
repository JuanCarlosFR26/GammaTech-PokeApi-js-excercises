// PokeApi
// Para este ejercicio usaremos la PokeApi. La documentación de la PokeApi es un poco enrevesada, ya que tiene muchos datos: tendrás que prestar mucha atención y rebuscar con cuidado.

// Al final tienes un par de imágenes con un resultado esperado.
const pokemon = fetch('https://pokeapi.co/api/v2/pokemon/')
// El ejercicio consiste en lo siguiente:

// Harás una petición general para obtener una lista de 10 pokemons. Tendrás que buscar cómo obtener sólo 10.
const first10Pokemons = fetch('https://pokeapi.co/api/v2/pokemon/?limit=10');
first10Pokemons
    .then(response => response.json())
    .then(pokemonList => {
        console.log(pokemonList);
        let arrPoke = [];

        // Iterarás dicha lista y por cada elemento pokemon harás una petición específica para obtener información detallada de ese pokemon. Esta información debe guardarse en un único array.
        pokemonList.results.forEach(pokemon => {
            arrPoke.push(pokemon)
        })

        // Itera por el array en la que has guardado la información de los pokemons y, por cada uno de los pokemons, introduce en el DOM una card con:
        arrPoke.forEach(poke => {
            fetch(poke.url)
                .then(response => response.json())
                .then(pokeinfo => {
                    console.log(pokeinfo);
                    const container = document.querySelector('.container');
                    const card = document.createElement('div');
                    const h3 = document.createElement('h3');
                    const h2 = document.createElement('h2');
                    const img = document.createElement('img');
                    const buttonDelete = document.createElement('button');
                    const link = document.createElement('a');


                    // Adding info
                    // h3.innerText = pokeinfo.order;
                    pokeinfo.game_indices.forEach(e => {
                        if(e.version.name === 'firered') {
                            h3.innerText = e.game_index;
                            link.href = `./pokemon.html?id=${e.game_index}`;
                            link.innerText = 'See';
                            link.target = '_blank';
                        }
                    })
                    h2.innerText = pokeinfo.name;
                    img.src = pokeinfo.sprites.front_shiny;
                    buttonDelete.innerText = 'Eliminar';

                    

                    // Nº de pokemon.
                    card.appendChild(h3)

                    // Nombre de pokemon.
                    card.appendChild(h2)

                    // Imagen del pokemon (las imágenes se encuentran dentro de sprites).
                    card.appendChild(img);

                    // Botón de eliminar, que borrará el pokemon del DOM.
                    card.appendChild(buttonDelete);
                    card.appendChild(link)


                    container.appendChild(card);
                    card.style.display = 'flex'
                    card.style.flexDirection = 'column';
                    card.style.justifyContent = 'center';
                    card.style.alignItems = 'center'
                    card.style.border = '8px dotted #45eedf';
                    card.style.width = '200px';
                    card.style.padding = '12px'
                    card.style.background = '#21afca'

                    img.style.width = '160px';
                    img.style.height = '160px'

                    buttonDelete.style.width = '100px'
                    buttonDelete.style.height = '40px'
                    buttonDelete.style.borderRadius = '15px'
                    buttonDelete.style.border = 'none'
                    buttonDelete.style.background = '#23eead'
                    buttonDelete.style.fontSize = '20px'
                    buttonDelete.style.color = '#fff'
                    buttonDelete.style.cursor = 'pointer'

                    container.style.display = 'flex'
                    container.style.width = '600px';
                    container.style.flexWrap = 'wrap';
                    container.style.gap = '38px';
                    container.style.margin = '80px auto';

                    buttonDelete.addEventListener('click', ()=> {
                        arrPoke.forEach(e => {
                            card.remove()
                        })
                    })



                })
        })
        const urlParams = new URLSearchParams(window.location.search);
                    const pokemonId = urlParams.get('id')
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                        .then(response => response.json())
                        .then(data => {
                            const pokemonNumber = data.id;
                            const pokemonName = data.name;
                            const pokemonNumberElement = document.createElement('p');
                            pokemonNumberElement.textContent = `Nº ${pokemonNumber}`;
                            const containerPokemon = document.querySelector('.container-pokemon');
                            containerPokemon.appendChild(pokemonNumberElement)
                            const pokemonNameElement = document.createElement('h1')
                            pokemonNameElement.textContent = pokemonName;
                            containerPokemon.appendChild(pokemonNameElement);

                            const pokemonImageUrl = data.sprites.front_shiny;
                            const pokemonImageElement = document.createElement('img');
                            pokemonImageElement.src = pokemonImageUrl;
                            containerPokemon.appendChild(pokemonImageElement);

                            const pokemonAbilities = data.abilities;
                            const pokemonabilitiesList = document.createElement('ul')
                            for(let i = 0; i <pokemonAbilities.length; i++) {
                                const ability = pokemonAbilities[i].ability.name;
                                const abilityElement = document.createElement('li')
                                abilityElement.textContent = ability;
                                pokemonabilitiesList.appendChild(abilityElement)
                            }
                            containerPokemon.appendChild(pokemonabilitiesList)
                        })
    })




// Como colofón final, añade al paso anterior un link a cada pokemon que debe redirigir a la página pokemon.html (tendrás que crearla). Al redirigir, añadirás a la url el parámetro id con el valor del nº de id de cada pokemon. En el archivo JS de pokemon.html, deberás extraer ese valor de la url (puedes encontrar un tutorial aquí) y hacer una petición a la PokeApi para ese pokemon en específico. A continuación, pinta en el DOM:
// Nº de pokemon.
// Nombre de pokemon.
// Imagen del pokemon (las imágenes se encuentran dentro de sprites).
// Una lista con las habilidades del pokemon.
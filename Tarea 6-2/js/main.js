let pokemonActual = 1;

function get_pokemon(url) {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            document.getElementById("foto").src = datos.sprites.other["official-artwork"].front_default;
            document.getElementById("nombre").innerHTML = datos.name;
            document.getElementById("peso").innerHTML = "Peso: " + datos.weight;
            document.getElementById("altura").innerHTML = "Altura: " + datos.height;
            document.querySelector('#btnAnterior').addEventListener('click', mostrarPokemonAnterior);
            document.querySelector('#btnSiguiente').addEventListener('click', mostrarSiguientePokemon);
            var movimientos = document.getElementById("movimientos");
            movimientos.innerHTML = "<br>";
            datos.moves.forEach((movimiento, index) => {
                movimientos.innerHTML += movimiento.move.name;
                if (index < datos.moves.length - 1) {
                    movimientos.innerHTML += " - ";
                }
            });

            var tipos = document.getElementById("tipos");
            tipos.innerHTML = "Tipos: " + obtenerTipos(datos.types);
            var estadisticas = document.getElementById("estadisticas");
            estadisticas.innerHTML = "Estadísticas:";
            var listaEstadisticas = document.getElementById("listaEstadisticas");
            listaEstadisticas.innerHTML = "";
            datos.stats.forEach(estadistica => {
                var item = document.createElement("li");
                item.textContent = estadistica.stat.name + ": " + estadistica.base_stat;
                listaEstadisticas.appendChild(item);
            });
        });
}

function mostrarSiguientePokemon() {
    pokemonActual++;
    if (pokemonActual <= 898) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonActual}`;
        get_pokemon(url);
        actualizarNumeroPokemon();
    } else {
        pokemonActual = 898;
    }
}

function mostrarPokemonAnterior() {
    pokemonActual--;
    if (pokemonActual >= 1) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonActual}`;
        get_pokemon(url);
        actualizarNumeroPokemon();
    } else {
        pokemonActual = 1;
    }
}

function actualizarNumeroPokemon() {
    document.getElementById('btnNumero').innerText = pokemonActual.toString();
}

window.onload = () => {
    get_pokemon("https://pokeapi.co/api/v2/pokemon/1");
    actualizarNumeroPokemon();
};

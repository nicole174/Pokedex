let pokemon = document.getElementById("pokemon");
let pokeImg = document.getElementById("pokeImg");
let final = document.getElementsByClassName("final");
let pokeName = document.getElementById("pokeName");
let pokeType = document.getElementById("pokeType");
let pokeStats = document.getElementById("pokeStats");
let pokeMove = document.getElementById("pokeMove");

function pokedex() {
    let nombre = pokemon.value.toLowerCase();
    let visible = document.getElementsByClassName("visible");
    for (let index = 0; index < visible.length; index++) {
        visible[index].style.display = "none";
    }
    console.log(nombre);

    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            throw new Error("Este Pokémon ¡NO EXISTE!");
            console.log(res);
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            pokeName.innerHTML = "";
            pokeName.style.color = "orange";
            pokeName.style.fontSize = "x-small"
            pokeType.innerHTML = "";
            pokeStats.innerHTML = "Estadísticas: ";
            pokeMove.innerHTML = "Movimientos: ";
            console.log(data);
            let poke = data.sprites.front_default;
            let pokeImg = document.getElementById("pokeImg");
            pokeImg.src = poke;

            let name = data.name;
            pokeName.innerHTML = `Nombre: ${name}`;

            let type = data.types[0].type.name;
            pokeType.innerHTML = `Tipo de pokémon: ${type}`;

            let stats = data.stats;
            for (let index = 0; index < stats.length; index++) {
                pokeStats.innerHTML += `${stats[index].stat.name} = ${stats[index].base_stat}, `;
            }

            let moves = data.moves;
            for (let index = 0; index < 10; index++) {
                pokeMove.innerHTML += `${moves[index].move.name}, ` 
            }
            final[0].style.display = "flex";
            console.log(stats);
        }
    }).catch(err => {

        pokeName.innerHTML = "Este Pokémon ¡NO EXISTE!";
        pokeName.style.color = "red";
        pokeName.style.fontSize = "small"
        pokeStats.innerHTML = "";
        pokeMove.innerHTML = "";
        pokeType.innerHTML = ""
        pokeImg.src = "../img/poke.png";
        final[0].style.display = "flex";
        console.error(err)
    })
}

function regresar() {
    final[0].style.display = "none";
    let visible = document.getElementsByClassName("visible");
    for (let index = 0; index < visible.length; index++) {
        visible[index].style.display = "flex"
    }
}


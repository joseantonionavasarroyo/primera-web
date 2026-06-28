//logica de recordar el tema que tenia el usuario
if(localStorage.getItem("tema")==="oscuro"){
    document.body.classList.add("modo-oscuro");
}


const boton = document.getElementById("btn-modo");
//modo oscuro
boton.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")){
        localStorage.setItem("tema","oscuro");
    }else{
        localStorage.setItem("tema","claro");
    }
});

//logica de cambio de titulo
titulo=document.querySelector("#titulo");
titulo.addEventListener("click", () => {
    if (titulo.textContent === "Blog de José Antonio") {
        titulo.textContent = "¡Has hecho clic en el título!";
    }else{
        titulo.textContent = "Blog de José Antonio";
    }
});

//logica de resaltado de posts
posts=document.querySelectorAll(".post");
posts.forEach((post) => {
    post.addEventListener("click", () => {
        post.classList.toggle("post_resaltado");
    });
});


//logica de likes
posts=document.querySelectorAll(".post");
posts.forEach((post) => {
    const botonLike = post.querySelector(".btn-like");
    let contadorLikes = 0;

    if (botonLike) {
        botonLike.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que el clic se propague al post
            if (botonLike.classList.contains("btn-like-liked")){
                contadorLikes--;
                botonLike.classList.remove("btn-like-liked");

            }else{
                contadorLikes++;
                botonLike.classList.add("btn-like-liked");
            }

            botonLike.textContent = "❤️ " + contadorLikes;
        });
    }
});


//logica de buscador
const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", () => {
    let busqueda=buscador.value.toLowerCase();
    posts.forEach((post) => {
        const tituloPost = post.querySelector("h2").textContent.toLowerCase();
        if(tituloPost.includes(busqueda)){
            post.style.display="block";
        }else{
            post.style.display="none";
        }
    });
});

//generador automatico de susciptores (personas aleatorias) con comprobacion de errores

const generador=document.querySelector("#btn-cargar-usuario");


generador.addEventListener("click",()=>{
    generador.textContent="cargando...";
    generador.disabled=true;
    fetch("https://randomuser.me/api/")
    .then(respuesta => respuesta.json()) // Convertimos los datos a formato entendible (JSON)
    .then(datos => {
        // Aquí ya tienes los datos listos para usarlos
        console.log(datos);
        const imagen=document.querySelector("#foto-suscriptor");
        const nombreSub=document.querySelector("#nombre-suscriptor");
        imagen.src=datos.results[0].picture.large;
        nombreSub.textContent=datos.results[0].name.first;
        console.log(datos.results[0].name.first);
        generador.textContent="Cargar otro usuario";
        generador.disabled=false;
    })
    .catch(error => {
        alert("Error de conexión");
        generador.textContent="Cargar usuario"
        generador.disabled=false;
    });
});

//logica rellenar formulario (un poco caca, solo comprueba la sintaxis de correo, no comprueba si existe)

const formulario=document.querySelector("#formulario-contacto");

if (formulario){
    formulario.addEventListener("submit",(event) => {
        event.preventDefault();

        const correo=document.querySelector("#email-input").value;
        const nombre=document.querySelector("#nombre-input").value;
        const exito=document.querySelector("#mensaje-exito");
        const error=document.querySelector("#mensaje-error");

        if (correo.includes("@") && nombre.length!=0){
            exito.style.display="block";
            error.style.display="none"
        }else{
            error.style.display="block";
            exito.style.display="none"
        }
    });
}


//logica aparicion de posts escondidos
// 1. Creamos al vigilante (Observer)
const observador = new IntersectionObserver((entradas) => {
    // Por cada elemento que el vigilante está mirando...
    entradas.forEach((entrada) => {
        // Si el elemento acaba de entrar en la pantalla (isIntersecting)...
        if (entrada.isIntersecting) {
            // Le añadimos la clase 'mostrar' para que haga la animación
            entrada.target.classList.add("mostrar");
        }
    });
});

// 2. Buscamos todos los posts que están ocultos
const elementosOcultos = document.querySelectorAll(".oculto");

// 3. Le decimos al vigilante que los vigile uno por uno
elementosOcultos.forEach((elemento) => {
    observador.observe(elemento);
});


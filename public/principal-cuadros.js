function cargaPrincipal(){
	let cabezas = document.getElementsByClassName("circulos");
	let i = 1;
	// Oculta las cabezas
	while(i<cabezas.length){
		cabezas[i].style.display = "none";
		i++;
	}
	let j = 0;

	let adelante = document.getElementById('right-triangle');
	let atras = document.getElementById('left-triangle');

	//funcion de boton derecho
	adelante.addEventListener('click',function(){
		cabezas[j].style.display = "none";
		if(j==cabezas.length-1){
			j=0;
			cabezas[j].style.display = "flex";
		}else{
			j++;
			cabezas[j].style.display = "flex";
		}
		cargaDeTabla(cabezas, j);
	});

	//Funcion Boton izquierdo
	atras.addEventListener('click',function(){
		cabezas[j].style.display = "none";
		if(j==0){
			j = cabezas.length-1;
			cabezas[j].style.display = "flex";
		}else{
			j--;
			cabezas[j].style.display	= "flex";
		}
		cargaDeTabla(cabezas, j);
	});
	cargaDeTabla(cabezas, j);

	// Pie de pagina
	window.addEventListener('scroll',()=>{
		let animado = document.getElementsByClassName('pieDePagina');
		let posicion = animado[0].getBoundingClientRect().top
		let tamañoPantalla = window.innerHeight/1.5;

		if(posicion < tamañoPantalla){
			animado[0].style.webkitAnimation= 'mostrar 5s forwards ';
		}
	});
};

function cargaDeTabla(cabezas, j) {

	cabezas[j].addEventListener('click', function () {
		//Guardo la ventana actual INDEX.html en una variable
		let ventanaIndex = window;
		const ventanaCuadro = window.open("/api/battle");
		ventanaCuadro.addEventListener('DOMContentLoaded',function(){
			//le paso la ventana a la otra ventana cuadro.html
			ventanaCuadro.mostrarElemento(j,ventanaIndex);
			
		});
	});
};

function mostrarElemento(posicion,ventanaIndex){
	//Cierra la vetana index y carga el cudro
	ventanaIndex.close();
	//Cargamos el json
	console.log(posicion)
	const xhttp = new XMLHttpRequest();
  	xhttp.open('GET','battlesData.json',true);
	xhttp.send();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let dtosBatallas = JSON.parse(this.responseText);
			let indice = dtosBatallas[posicion];
			cargarDatos(indice);
		}
	};
};

function cargarDatos(indice){
	let divTitulo = document.getElementById('tituloCabecera');
	let imagen = document.getElementById('imagen');
	imagen.innerHTML = `<img src="${indice.picture}" alt="" id="imagen">`
	divTitulo.innerHTML = indice.id;
		
	let divInformacion = indice.infoDeFila;
	divTabla = document.getElementById('tabla');
	divTablaDes = document.getElementById('tabla-description');

	let i = 0;
	let j = 0;
	let infor;
	
	while(i<divInformacion.length){
		infor = divInformacion[i];
		divTabla.innerHTML+= `<div class='table-content' > ${infor.integrantes} </div>`;
		divTabla.innerHTML+= `<div class='table-content' > ${infor.inicio} </div>`;
		divTabla.innerHTML+= `<div class='table-content' > ${infor.fin} </div>`;
		divTabla.innerHTML+= `<div class='table-content' > ${infor.ganador} </div>`;
		divTabla.innerHTML+= `<div class='table-content' >  <a href="${infor.link}">Ver Video</a></div>`;
		divTabla.innerHTML+= `<div class='table-content' > <button class = "mostrar">Mostrar</button></div>`;
		divTablaDes.innerHTML+= `<div class='table-description' > ${infor.descripcion} </div>`;
		i++;
	}
	mostrarDescripcion();
};

function mostrarDescripcion(){
	const descripcion = document.getElementsByClassName('table-description');
	let i = 0;
	let botones = document.getElementsByClassName("mostrar");
	let botonesArray = Object.entries(botones);
		
	while(i < descripcion.length){
		descripcion[i].style.display = "none";
		i++;
	}
	i = 0;
	botonesArray.forEach((element,i)=>{
		element[1].addEventListener('click',()=>{
			if(descripcion[element[0]].style.display === "flex"){
				descripcion[element[0]].style.display = 'none';
			}else{
				descripcion[element[0]].style.display = 'flex';
			}
		});
	});
};
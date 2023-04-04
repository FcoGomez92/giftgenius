Side project en proceso. Desarrollado por [@FcoGomez92_](https://twitter.com/fcogomez92_) para probar las API's de OpenAI y Twitter. Nace inspirado por el proyecto [abbrevia.me](https://abbrevia.me) de [@itortv](https://twitter.com/itortv)

GiftGenius es una herramienta de asistencia que te ayuda a elegir el regalo perfecto para cualquier persona. Utiliza inteligencia artificial para analizar el perfil de Twitter de la persona en cuestión y devuelve un breve informe con su descripción, gustos y necesidades. Además, te presenta una lista de cinco productos seleccionados especialmente para esa persona, para que puedas sorprenderla con un regalo personalizado y acertado.

La idea final es monetizar a través de la API de afiliados de Amazon, permitiendo que los resultados de búsqueda se presenten en forma de fichas de productos completas con la opción de compra directa en Amazon.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TAREAS PENDIENTES O IDEAS PARA FEATURES:

- Terminar el diseño y funcionalidad del front.

- Incluir opciones avanzadas del prompt desde el front. Por ejemplo: Seleccionar parentesco con la persona, motivo del regalo (cumpleaños, Reyes, Navidad, San valentin, aniversario, etc...), presupuesto máximo.

- Limpiar las urls de los twits. Eliminarlos directamente o sustituirlos por el indicador "(url, imagen o video)". Ejemplo de implementación:
 let textoSinUrls = textoConUrls.replace(/https:\/\/[\n\S]+/gi, ''); 

- Aislar la lista de productos en un array para luego usar la api de amazon affiliate para buscar esos productos. Ejemplos de implementación:
 OPT 1: const str = "..."; const productsArray = str.split("\n").splice(-5) 
 OPT 2: let inicioProductos = texto.indexOf("PRODUCTOS:") + 11;
            let finProductos = texto.length;
            let productosTexto = texto.slice(inicioProductos, finProductos).trim();
            let productosArray = productosTexto.split(/\d+\./).slice(1).map((producto) => producto.trim()); 


- Aislar los numeros de tokens usados y tokens maximos al llamar a openAI en el caso de que el prompt sea demasiado largo para luego recortar los twits necesarios y reiniciar la petición. Ejemplos de implementación:
 OPT 1: const numbers = str.split(" ").filter(w=>!isNaN(w))
 OPT 2: const str = "This model's maximum context length is 4097 tokens. However, your messages resulted in 5137 tokens. Please reduce the   length of the messages.";
            const regex = /\d+/g;
            const numbers = str.match(regex); 



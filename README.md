Taringa home
============

Rediseño de la home de taringa.

Para realizar el rediseño de la home de taringa, usamos el entorno [snippets](https://github.com/tiko2015/snippets)

Esto nos facilita utilizar plantillas jade junto a less y compilarlo en tiempo real con un servidor en node.

La estructura de directorios less, para ordenar los estilos, es la siguiente:

- 01 core (reset y elementos básicos)
- 02 extends (mixins y funcionalidades extras)
- 03 layouts (estructuras en general)
- 04 elements (elementos genericos utilizados en diferentes secciónes)
- 05 widgets (elementos implementados según sus particularidades)
- 06 navigation (navegaciones y subnavegaciones)
- 07 pages (particularidades de cada página)

El directorio views contiene las estructura html de cada página con sus include.

El directorio models contiene las estructuras de datos utilizadas en los templates.

Los contenidos compilados, tanto html como css, están en el directorio public.


Iconos
------

Para agregar iconos antes de un texto se pueden incluir agregando las siguientes definiciones de estilos:

    .icon-apuntes       
    .icon-animaciones   
    .icon-arte          
    .icon-autos         
    .icon-ciencia       
    .icon-deportes      
    .icon-ecologia      
    .icon-economia      
    .icon-femme         
    .icon-hazlo         
    .icon-humor         
    .icon-imagenes      
    .icon-info          
    .icon-juegosonline  
    .icon-linux         
    .icon-mac           
    .icon-mascotas      
    .icon-noticias      
    .icon-offtopic      
    .icon-paranormal    
    .icon-patrocinado   
    .icon-recetas       
    .icon-reviews       
    .icon-salud         
    .icon-solidaridad   
    .icon-taringa       
    .icon-turismo       
    .icon-videos        
    .icon-juegos        
    .icon-links         
    .icon-musica        
    .icon-tv            
    .icon-celulares     
    .icon-ebooks        
    .icon-comic         
    .icon-anime         
    .icon-estadisticas  
    .icon-shouts        
    .icon-notificaciones
    .icon-mensajes      
    .icon-favoritos     
    .icon-buscador      
    .icon-pulgararriba  
    .icon-pulgarabajo   
    .icon-tops          
    .icon-usuarios      
    .icon-tiempo        
    .icon-facebook      
    .icon-twitter       
    .icon-comments      
    .icon-candado       
    .icon-camara        
    .icon-video         
    .icon-candado       
    .icon-cerrar
    .icon-medalla
    .icon-tesigue
    .icon-puntos
    .icon-commentsrespond
    .icon-escribioperfil
    .icon-cambiorango
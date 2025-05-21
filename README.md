# 🧠 DevArena - Plataforma para Hackatones

> Aplicación enfocada en la creacion y participaciones de hackatones para los programadores 

---

## 📝 Descripción

*DevArena* es una plataforma que por medio del inicio de session con Clerk te permite:
- 🧑🏻‍💻 Si eres participante: Participar en los hackatones que los organizadores creen en donde veras los detalles del hackaton como una convocatoria 
- 🤵🏻‍♂️ Si eres organizador: Puedes crear hackatones con la informacion necesaria para informar a los programadores sobre los requisitios para cada hackaton que crees **(informacion, premios, lenguajes o una imagen representativa)**. 

🎯 El objetivo es:

- Presentar nuevos **retos a la comunidad**
- Incentivar a participar por su  **facil uso**
- Facil entrega y creacion de **proyectos**

---

## 🔐 Autenticación

Implementacion de [Clerk](https://clerk.dev/) para acceso seguro:

- Ingreso con **Github**, **Twitch** y **Google**
- Acceso a la **informacion del usuario**
- Manejar la informacion entregada por Clerk para su uso en la base de datos en [PostgreSQL](https://www.postgresql.org/)
- Uso de la [publicMetaData](https://clerk.com/docs/users/metadata) de Clerk para el manejo de **Links de Navegacion** dentro de la pagina y determinar el rol cuando termina de autenticarse el usuario.
- Uso de Clerk dentro de la API para la asignacion de rol
- Personalizacion del <UserProfile /> acorde a la pagina

---

## 💊 Funcionalidades actuales

- ✅ Registro y inicio de sesion para acceder a las paginas determinadas por cada rol 
- ✅ Envios de formularios de correo 

**Si eres un organizador**
- ✅ Panel de control, crear y ver tus hackatones creados 
- ✅ Previsualizacion de tu hackaton dentro de la seccion de hackatones para los participantes
- ✅ Logica para asignar a los ganadores de forma interactiva y visual
- ✅ Logica para asignar premios, asignar lenguajes y la subida de la  imagen del hackaton a [Cloudinary](https://cloudinary.com/) para que sea visible en la plataforma

**Si eres un participante**
- ✅ Visualizacion con filtro de los hackatones
- ✅ Participacion a los hackatones de manera intuitiva (poner tu Github, Repositorio, Nombre Proyecto)
- ✅ Ver los hackatones en donde participaste
- ✅ Logica si es que ganaste tendras el email del creador del hackaton para pedir tus premios

---

## 💼 Repositorios

- 💻 Frontend: [https://github.com/EnriqueHM31/Hackaton-Clerk-Midudev](https://github.com/EnriqueHM31/Hackaton-Clerk-Midudev)
- 🛠️ Backend:  [https://github.com/EnriqueHM31/Server-Clerk](https://github.com/EnriqueHM31/Server-Clerk)

---


## 🔗 Proyecto en producción

🌐 [https://hackaton-clerk.vercel.app/](https://hackaton-clerk.vercel.app/)

---

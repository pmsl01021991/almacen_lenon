Paso 1. Instalar Firebase CLI
Vamos a hacerlo desde VS Code, sin necesidad de Android Studio ni de configurar servidores locales.

1. Abre VS Code y abre la carpeta ALMACEN_MEGAESTRUCTURA.

2. Abre la terminal:
- Menú Terminal.
- Selecciona New Terminal (Nueva terminal).
3. Ejecuta este comando:
npm install -g firebase-tools


Esto instala las herramientas oficiales de Firebase para publicar tu proyecto.

Paso 1. Crear el proyecto en Firebase
1. Ingresa a Firebase Console.
2. Inicia sesión con pmsl01021991@gmail.com.
3. Haz clic en Crear un proyecto.
4. Coloca como nombre: almacen-lenon.
5. Continúa con la creación del proyecto.

Paso 2. Iniciar sesión en Firebase
En la misma terminal de VS Code ejecuta:
firebase login


1. Se abrirá una ventana del navegador.
2. Selecciona tu cuenta de Google.
3. Autoriza el acceso a Firebase CLI.
4. Regresa a VS Code.
Si todo sale bien, la terminal indicará que has iniciado sesión correctamente.
Paso 3. Verificar la sesión
Ejecuta:
firebase projects:list


Esto mostrará los proyectos de Firebase asociados a tu cuenta.

Ahora ejecuta:

firebase init hosting

C:\ALMACEN LENON\ALMACEN_MEGAESTRUCTURA> firebase init hosting

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  C:\ALMACEN LENON\ALMACEN_MEGAESTRUCTURA

Before we get started, keep in mind:

  * You are currently outside your home directory

? Are you ready to proceed? (Y/n)

Escribe:
Y

✔ Are you ready to proceed? Yes

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 

? Please select an option:
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project

↑↓ navigate • ⏎ select

Aquí selecciona la primera opción:

Seleccionar
 Use an existing project
1. Presiona Enter.
2. Aparecerá la lista de tus proyectos de Firebase.
3. Selecciona el proyecto que acabas de crear.

Si aparece, continuamos con:
firebase init hosting

Cuando aparezca esta pregunta:
Are you ready to proceed? (Y/n)


Escribe Y y presiona Enter.

✔ Are you ready to proceed? Yes

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 

? Please select an option:
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project

↑↓ navigate • ⏎ select

Estás en la pantalla correcta.
1. Deja seleccionada la opción Use an existing project.
2. Presiona Enter.
3. Te aparecerá la lista de proyectos de Firebase.
4. Selecciona almacen-lenon y presiona Enter.

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? (public)

aquí debes escribir:
.

Solo un punto, y presiona Enter.

✔ What do you want to use as your public directory? .
? Configure as a single-page app (rewrite all urls to /index.html)? (Y/n)

elecciona No. Escribe:
n


Y presiona Enter.

? Set up automatic builds and deploys with GitHub? (Y/n)

selecciona No por ahora:
n


Presiona Enter.

+  Wrote 404.html
? File index.html already exists. Overwrite? (y/N)

Aquí es importante no sobrescribir tu página principal.

Escribe:
n


Y presiona Enter.

=== Agent Skills Setup
If you are using an AI coding agent, Firebase Agent Skills make it an expert at Firebase.
? Would you like to install agent skills for Firebase? (Y/n)

elecciona No:
n


Presiona Enter.

✔ Would you like to install agent skills for Firebase? No

+  Wrote configuration info to firebase.json
+  Wrote project information to .firebaserc
+  Wrote .gitignore

+  Firebase initialization complete!
PS C:\ALMACEN LENON\ALMACEN_MEGAESTRUCTURA> 

## ULTIMO PASO:

Ya conectamos tu carpeta local con el proyecto almacen-lenon. Además, se crearon estos archivos:
- firebase.json: configuración de Hosting.
- .firebaserc: vinculación con tu proyecto Firebase.
- .gitignore: archivos que Git debe ignorar.
Siguiente paso: publicar tu sistema
En la misma terminal ejecuta:
firebase deploy --only hosting


Presiona Enter y espera a que termine.

# SI NO TE SALE EL CORREO EXACTO DESLOGUEATE PRIMERO:

Eso explica por qué no encuentras el proyecto: probablemente el proyecto de Firebase está asociado a la otra cuenta de Google.
Vamos a solucionarlo
Primero, cierra la sesión actual de Firebase:
firebase logout


Luego inicia sesión con la cuenta que utilizas para tu proyecto:
firebase login


Cuando se abra el navegador, inicia sesión con la cuenta Google que tiene tu proyecto de Firebase.

Después ejecuta:
firebase projects:list


Así comprobaremos si aparece el proyecto.
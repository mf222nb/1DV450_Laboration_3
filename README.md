##Installation API

1. Ladda ner eller forka repot
2. När du öppnat applikationen så skriver du i terminalen bundle install för att få in gems du kanske missar.
3. För att skapa databasen skriver du "rake db:migrate".
4. För att få in lite dummy - data skriver du "rake db:seed".
5. Skriv rails s för att starta servern

Notering: Kör du genom nitrous.io så måste du ändra i config.ru och ändra origin från 'localhost:3000' till den
start URL som du får från nitrous.io.

Om API:et inte skulle fungera i detta repo så kan du testa att ladda ner den separat från detta repo:
https://github.com/mf222nb/1DV450_Laboration_2

##Installation AngularJS

1. Ladda ner eller forka repot
2. Öppna i Webstorm eller liknande program
3. Gå till webbläsaren och skriv in i URL http://localhost:63343/1DV450_Laboration_3/Laboration_3/app/index.html

Användarenamn: Steve, Pelle och Jonas<br>
Lösenord för alla användare: qwerty

Notering: Kör du nitrous.io kommer du att få ändra alla kall som görs till API:t från localhost:3000 till den start
url du får från nitrous.io, dessa filer är loginModule, mainModule, createModule, updateModule.
Du får även ändra URLen i webbläsaren från localhost:63343 till det du får i nitrous.io.

##Förändringar API

* När jag hämtar ut event har jag gjort så att man får ut position, tags och creators istället för att bara få ut events.
* Jag har lagt till ett fält i databasen på event som är title.
* Jag har lagt in logik så att man bara kan ta bort och uppdatera sina egna resurser och inte andras.
* När man skapar ett event så sparar man även ner en position.

##Applikation

Detta är en tjänst för att skapa aktiviteter på den plats man befinner sig på. En användare kan se alla aktiveter som finns
på olika platser. En användare kan ta bort och uppdatera sina aktiviteter om denna så skulle vilja om denna är inloggad.
En användare kan behöver dock inte vara inloggad för att se alla aktiviteter som andra användare har skapat.
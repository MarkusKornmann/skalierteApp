### skalierteApp

Alias setzen:

sudo bash -c "echo -e \"alias dc='docker compose'\nalias dcu='docker compose up'\nalias dcd='docker compose down'\nalias ndc='sudo nano compose.yml'\" >> ~/.bashrc"

source ~/.bashrc

dc build && dcu -d --scale app=3

dc ps 

skaliert-app-1       skaliert-app   "docker-entrypoint.s…"   app       19 seconds ago   Up 19 seconds   4000/tcp, 8081/tcp

skaliert-app-2       skaliert-app   "docker-entrypoint.s…"   app       19 seconds ago   Up 19 seconds   4000/tcp, 8081/tcp

skaliert-app-3       skaliert-app   "docker-entrypoint.s…"   app       19 seconds ago   Up 19 seconds   4000/tcp, 8081/tcp

skaliert-traefik-1   traefik:v3.0   "/entrypoint.sh --ap…"   traefik   19 seconds ago   Up 19 seconds   80/tcp, 0.0.0.0:4000->4000/tcp, [::]:4000->4000/tcp, 0.0.0.0:4080->8080/tcp, [::]:4080->8080/tcp


WebApp ist erreichbar unter: http://localhost:4000

Willkommen zur skalierten App auf Port 4000!


## Load Balancing in Traefik testen
Um zu überprüfen, ob Traefik wirklich die Anfragen auf alle App-Instanzen verteilt, gibt es mehrere Möglichkeiten:

1️⃣ Browser-Refresh (Einfachste Methode)
Öffne deine App im Browser: http://localhost:4000

Drücke mehrmals STRG + R oder F5 und beobachte, ob du zufällig auf unterschiedliche Instanzen weitergeleitet wirst.
→ Falls du console.log in deiner App verwendest, kannst du in den Logs sehen, welche Instanz antwortet.

2️⃣ Direkt die Container-Logs beobachten
Öffne parallel mehrere Terminals und führe folgenden Befehl aus:

docker logs -f skaliert-app-1 &
docker logs -f skaliert-app-2 &
docker logs -f skaliert-app-3 &

Dann rufe mehrmals die App auf (http://localhost:4000).
Wenn Load Balancing funktioniert, sollten alle drei Logs abwechselnd Zugriffe anzeigen.

3️⃣ Mit curl und Container-Namen testen
Rufe curl mehrmals auf: curl http://localhost:4000

Falls Load Balancing funktioniert, sollte es jedes Mal von einer anderen App-Instanz beantwortet werden.

4️⃣ Traefik Dashboard prüfen
Öffne das Traefik Dashboard: http://localhost:4080

Gehe zu "HTTP Routers" → Dort siehst du die Anfragen und wie sie verteilt werden.
Gehe zu "Services" → Du solltest mehrere Instanzen (skaliert-app-1, skaliert-app-2, etc.) sehen.

5️⃣ Manuell per docker exec in Container springen
Öffne eine Shell in den laufenden App-Containern:

docker exec -it skaliert-app-1 sh








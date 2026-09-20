# .NET25 laboration: AI-tjänster

# Image Analyzer

Image analyzer är en webbsida där man kan ladda upp valfri bild från enheten man använder och få den bilden analyserad med hjälp av Azure AI vision analyseringen visas sedan upp under bilden i form av taggar på individuella kort.
Image analyzer är skriven i React Typescipt som sköter frontend biten
och ASP.NET core API som hanterar backend och Azure delarna vilket möjliggör denna typen av analysering

## Hur fungerar Image Analyzer

1. Användaren väljer en bild från sin enhet.

2. Bilden visas i frontend som en preview.

3. När användaren klickar på "Analysera bild" skickas bilden från React till projektets ASP.NET Core API.

4. API:t skickar bilden vidare till Azure AI Vision.

5. Azure AI Vision analyserar bilden och returnerar bland annat olika tags och confidence värden.

6. Resultatet skickas tillbaka till frontend som JSON.

7. React visar resultatet för användaren under bilden.

### starta backend

För att starta Image Analyzer behöver användaren öppna terminalen och gå till backend projektet detta görs med kommandot.

cd Imageanalyzer.Api

starta sedan programmets API med kommandot

dotnet run

när API är igång syns det i terminalen ungefär såhär

info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5278
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]

OBS!!!! 
Backendens port kan skilja sig mellan olika datorer. Om porten ändras behöver URL:en i frontendens `imageApi.ts` uppdateras så att den pekar på rätt port.

#### starta frontend 

frontend startas genom att i terminalen använda kommadot

cd image-analyzer

och sedan kör kommandot

npm install

kommandot npm install som tidigare nämnts används för att installera programmets npm paket och dependencies
Vet man att man har detta kan man ignorera det.

sedan för att starta frontend kör man kommandot.

npm run dev 

och klicka på länken som dyker upp borde se ut ungefär såhär

  VITE v8.3.0  ready in 461 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

##### Starta Azure Ai

För att progrmmet ska kunna nalysera bilder behöver man stå i backend mappen DVS ImageAnalyzer.Api och köra följande kommandon.

dotnet user-secrets init

dotnet user-secrets set "AzureVision:Endpoint" "DIN_ENDPOINT"
dotnet user-secrets set "AzureVision:Key" "DIN_API_NYCKEL"

NOTERA "DIN ENDPOINT" "DIN NYCKEL" dessa hämtar du från din egna Azure har du en visuellt innehåll resurs kan användaren bara köra via den men annars behöver sådan resurs kopplas sedan klistras endpoint och nyckel in där det just nu står din enpoint din nyckel 


###### Varför Azure AI visuell

Azure Ai används eftersom den kan analyzera bilder och identifiera olika objekt som presenteras i vald bild 
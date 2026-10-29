# Strategia testów automatycznych

## Cel

Strategia opisuje, jak rozwijać i uruchamiać testy automatyczne w repozytorium `testShop-tests`. Jej celem jest szybkie wykrywanie regresji w kluczowych ścieżkach użytkownika i API, przy zachowaniu czytelnych, powtarzalnych testów.

Repozytorium używa Playwrighta i TypeScriptu. Obecny zakres obejmuje testy przeglądarkowe E2E i testy API. Testy jednostkowe, integracyjne aplikacji, wydajnościowe i bezpieczeństwa nie są obecnie częścią tego repozytorium; należy je zaplanować osobno, jeśli będą wymagane.

## Zakres i poziomy testów

### E2E

Testy E2E w `tests/e2e` sprawdzają widoczne zachowanie aplikacji z perspektywy użytkownika w przeglądarce. Powinny obejmować przede wszystkim krytyczne ścieżki, takie jak przeglądanie oferty, wyszukiwanie, koszyk i składanie zamówienia — o ile te funkcje są dostępne w testowanej aplikacji.

- Używaj Page Objectów z `src/pages` do współdzielenia interakcji z interfejsem.
- Sprawdzaj istotne zachowanie lub rezultat dla użytkownika, nie tylko fakt załadowania strony.
- Opieraj selektory na dostępnych rolach, etykietach i stabilnych identyfikatorach; unikaj zależności od kruchych selektorów CSS i układu strony.
- Ogranicz liczbę scenariuszy E2E do tych, które weryfikują ważne przepływy. Szczegóły wariantów i reguł walidacji lepiej sprawdzać niżej, przez API lub testy jednostkowe aplikacji.

### API

Testy API w `tests/api` powinny weryfikować dostępność oraz kontrakt używanych endpointów: kody odpowiedzi, strukturę i istotną zawartość odpowiedzi, a także zachowanie przy poprawnych i niepoprawnych danych wejściowych.

- Korzystaj ze współdzielonego `ApiClient` w `src/api` i fixture `apiClient` z `src/fixtures`.
- Utrzymuj testy niezależne od kolejności oraz od stanu pozostawionego przez inne testy.
- Jeśli test modyfikuje dane, używaj dedykowanych danych testowych i sprzątaj je po teście, gdy API to umożliwia.
- Nie traktuj samego braku odpowiedzi 5xx jako pełnego potwierdzenia poprawnego działania endpointu. Dla każdego znanego endpointu określ oczekiwany status i kontrakt.

## Priorytety

Testy należy dobierać według ryzyka i znaczenia funkcji:

1. **Krytyczne ścieżki zakupowe** — poprawne przejście od przeglądania produktu do złożenia zamówienia, jeśli te funkcje są dostępne.
2. **Dostępność i podstawowe kontrakty API** — poprawne odpowiedzi endpointów potrzebnych do działania aplikacji.
3. **Reguły biznesowe i walidacja** — ceny, wymagane pola, granice i błędne dane.
4. **Przypadki brzegowe oraz mniej istotne elementy UI** — dodawane w miarę potrzeb, bez dublowania tych samych asercji na wielu poziomach.

Każdy nowy test powinien odpowiadać na konkretne ryzyko regresji i mieć jednoznaczny, sprawdzalny rezultat.

## Organizacja i dane testowe

- Umieszczaj scenariusze E2E w `tests/e2e`, a scenariusze API w `tests/api`.
- Wspólną inicjalizację udostępniaj przez `src/fixtures`; logikę stron przez `src/pages`, a komunikację API przez `src/api`.
- Nazwy testów opisują oczekiwane zachowanie. Test powinien mieć asercje dotyczące wyniku, a nie jedynie przejść przez kroki bez weryfikacji.
- Każdy test powinien móc działać samodzielnie i równolegle. Nie polegaj na stanie utworzonym przez inny test ani na stałej kolejności wykonania.
- Dane konfiguracyjne środowiska przekazuj przez `.env` (`BASE_URL`, `API_URL`). Nie umieszczaj sekretów ani danych zależnych od konkretnego środowiska w kodzie testów.
- Preferuj dane deterministyczne oraz izolowane dla testu. Unikaj współdzielenia kont lub rekordów, które równoległe testy mogą jednocześnie zmieniać.

## Uruchamianie i środowiska

Projekt udostępnia następujące polecenia:

- `npm test` — wszystkie projekty Playwright;
- `npm run test:e2e` — projekt przeglądarkowy E2E;
- `npm run test:api` — projekt API;
- `npm run test:ui` — interaktywne uruchamianie Playwright;
- `npm run report` — otwarcie raportu HTML;
- `npm run typecheck` — kontrola typów TypeScript.

Przed uruchomieniem testów należy skonfigurować `BASE_URL` i `API_URL`. W CI konfiguracja Playwrighta zabrania `test.only`, ustawia dwa ponowienia po błędzie i ogranicza liczbę workerów do dwóch. Lokalnie ponowienia są wyłączone, a liczba workerów pozostaje domyślna dla Playwrighta.

W CI należy uruchamiać testy na kontrolowanym środowisku testowym, którego dane i adresy są konfigurowane poza kodem. Testów nie należy kierować na środowiska produkcyjne ani wykonywać w nich operacji modyfikujących dane.

## Raportowanie i analiza błędów

Playwright zapisuje raport HTML i raport tekstowy. Konfiguracja zapisuje zrzut ekranu przy niepowodzeniu oraz ślad przy pierwszym ponowieniu testu. Przy analizie błędu sprawdź raport, zrzut ekranu, ślad, logi testu i dostępność środowiska.

Ponowienie pomaga zebrać materiał diagnostyczny, ale nie jest kryterium stabilności. Test, który przechodzi dopiero po ponowieniu, należy zbadać i naprawić; nie należy maskować problemu przez zwiększanie liczby ponowień.

## Kryteria jakości

Test jest gotowy do utrzymania, gdy:

- weryfikuje konkretny rezultat i kończy się asercją odpowiadającą sprawdzanej funkcji;
- jest deterministyczny, niezależny od kolejności i bezpieczny przy równoległym wykonaniu;
- korzysta ze stabilnych selektorów i istniejących fixture'ów lub helperów;
- nie zawiera sekretów ani niejawnych zależności od lokalnego środowiska;
- przechodzi odpowiedni projekt Playwrighta oraz `npm run typecheck`.

Test niestabilny należy diagnozować u źródła — sprawdzić synchronizację, selektory, dane, współbieżność i stan środowiska — zamiast dodawać arbitralne opóźnienia.

## Rozwój strategii

Obecne testy są testami bazowymi: scenariusz E2E sprawdza widoczność treści strony głównej, a test API sprawdza, czy odpowiedź nie ma statusu 5xx. W miarę poznawania kontraktów aplikacji należy zastępować ogólne kontrole konkretnymi asercjami dla kluczowych funkcji i endpointów.

Kolejność rozwoju:

1. Ustalić krytyczne ścieżki użytkownika oraz kontrakty endpointów dostępnych w testowanej aplikacji.
2. Dodać stabilne, niezależne testy API dla tych kontraktów.
3. Rozszerzyć E2E o najważniejsze przepływy użytkownika, ograniczając powielanie szczegółowych kontroli API.
4. Uruchamiać odpowiednie projekty i kontrolę typów w CI oraz przechowywać raporty i artefakty błędów zgodnie z polityką projektu.
5. Regularnie przeglądać wartość testów, czas wykonania i przyczyny niestabilności; usuwać duplikaty oraz aktualizować scenariusze wraz ze zmianami aplikacji.

Strategię należy aktualizować, gdy zmieniają się funkcje aplikacji, środowiska, pipeline CI lub wymagany zakres testów.

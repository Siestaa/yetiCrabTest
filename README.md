Запустить локально - склонируйте и введите в консоле np, run dev
Деплой: https://yeti-crab-test.vercel.app/

Требования к документации:

1. Получение списка достопримечательностей
   GET /api/attractions

Возвращает список всех достопримечательностей или одну достопримечательность по её ID.
ALL: endpoint - GET /api/attractions
response status 200: [
{
"id": "1",
"title": "Эйфелева башня",
"description": "Знаменитая железная башня в центре Парижа",
"createdAt": "2025-03-22T10:30:00Z",
"rating": 5,
"photoUrl": "/eiffel-tower.jpg",
"location": "Париж, Франция",
"coordinates": { "latitude": 48.8584, "longitude": 2.2945 },
"status": "planned"
},
...
]

one item: endpoint GET /api/attractions?id=1
response status 200: {
"id": "1",
"title": "Эйфелева башня",
"description": "Знаменитая железная башня в центре Парижа",
"createdAt": "2025-03-22T10:30:00Z",
"rating": 5,
"photoUrl": "/eiffel-tower.jpg",
"location": "Париж, Франция",
"coordinates": { "latitude": 48.8584, "longitude": 2.2945 },
"status": "planned"
}

response status 404: {
"message": "Attraction not found"
}

2. Создание новой достопримечательности
   POST /api/attractions

Добавляет новую достопримечательность в список.
Payload: {
{
"title": string,
"description": string,
"rating": number,
"photoUrl": string,
"location": string,
"coordinates": {
"latitude": number,
"longitude": number
},
"status": string
}
}

response status 201 {
{
"id": "uuid-generated",
"title": "Новая достопримечательность",
"description": "Описание новой достопримечательности",
"createdAt": "2025-03-23T12:00:00Z",
"rating": 4,
"photoUrl": "/new-attraction.jpg",
"location": "Город, Страна",
"coordinates": { "latitude": 50.1234, "longitude": 30.5678 },
"status": "planned"
}
}

response status 400: {
"message": "Invalid request body"
}

3. Обновление статуса достопримечательности
   PATCH /api/attractions

Обновляет статус конкретной достопримечательности по её ID.
Payload: {
{
"id": string
}
}

response status 200 {
{
"id": "1",
"title": "Эйфелева башня",
"description": "Знаменитая железная башня в центре Парижа",
"createdAt": "2025-03-22T10:30:00Z",
"rating": 5,
"photoUrl": "/eiffel-tower.jpg",
"location": "Париж, Франция",
"coordinates": { "latitude": 48.8584, "longitude": 2.2945 },
"status": "visited"
}
}

response status 404: {
"message": "ID is required" | "Invalid status"
}

4. Полное обновление достопримечательности
   PUT /api/attractions/{id}

Обновляет все поля достопримечательности по её ID (кроме id и createdAt).
Payload: {
{
"title": string,
"description": string,
"rating": number,
"photoUrl": string,
"location": string,
"coordinates": {
"latitude": number,
"longitude": number
},
"status": string
}
}

response status 200 {
{
"id": "1",
"title": "Эйфелева башня",
"description": "Знаменитая железная башня в центре Парижа",
"createdAt": "2025-03-22T10:30:00Z",
"rating": 5,
"photoUrl": "/eiffel-tower.jpg",
"location": "Париж, Франция",
"coordinates": { "latitude": 48.8584, "longitude": 2.2945 },
"status": "visited"
}
}

response status 400: {
"message": "Invalid request body"
}

5. Удаление достопримечательности
   DELETE /api/attractions/{id}

Удаляет достопримечательность по её ID.

response status 200 {
{
"message": "Attraction deleted"
}
}

response status 500 {
{
"message": "Error deleting attraction"
}
}

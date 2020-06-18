ymaps.ready(init);

function init() {
    // Данные о местоположении, определённом по IP
    var objects = ymaps.geoQuery([{
        type: 'Point',
        coordinates: [53.61, 55.89]
    }]);
    var geolocation = ymaps.geolocation,
        // координаты
        coords = [geolocation.latitude, geolocation.longitude],
        myMap = new ymaps.Map('map', {
            center: coords,
            zoom: 12
        });
    // Создадим объекты на основе JSON-описания геометрий.


    // Найдем объекты, попадающие в видимую область карты.
    objects.searchInside(myMap)
        // И затем добавим найденные объекты на карту.
        .addToMap(myMap);

    myMap.events.add('boundschange', function () {
        // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
        var visibleObjects = objects.searchInside(myMap).addToMap(myMap);
        // Оставшиеся объекты будем удалять с карты.
        objects.remove(visibleObjects).removeFromMap(myMap);
    });
}

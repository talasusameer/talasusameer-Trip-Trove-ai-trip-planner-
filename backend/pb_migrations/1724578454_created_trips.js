/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "38rp5ystodsiv7l",
    "created": "2024-08-25 09:34:14.136Z",
    "updated": "2024-08-25 09:34:14.136Z",
    "name": "trips",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ewthbt66",
        "name": "trip",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l");

  return dao.deleteCollection(collection);
})

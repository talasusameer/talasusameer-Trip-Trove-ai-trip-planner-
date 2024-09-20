/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewthbt66",
    "name": "trip",
    "type": "json",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

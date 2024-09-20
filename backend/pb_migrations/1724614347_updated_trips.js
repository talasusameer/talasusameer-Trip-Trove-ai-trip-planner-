/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjcsxtet",
    "name": "public",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // remove
  collection.schema.removeField("hjcsxtet")

  return dao.saveCollection(collection)
})

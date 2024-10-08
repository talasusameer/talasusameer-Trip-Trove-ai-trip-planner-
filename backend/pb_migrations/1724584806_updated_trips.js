/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygwrfz45",
    "name": "user_input",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // remove
  collection.schema.removeField("ygwrfz45")

  return dao.saveCollection(collection)
})

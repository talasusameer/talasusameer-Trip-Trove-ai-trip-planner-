/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udhtirny",
    "name": "image",
    "type": "url",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38rp5ystodsiv7l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udhtirny",
    "name": "image",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})

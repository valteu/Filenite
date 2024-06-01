/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = " @request.auth.verified = true && (@request.auth.id = user.id || @request.auth.id ?= sharedUsers.id )"
  collection.viewRule = " @request.auth.verified = true && (@request.auth.id = user.id || @request.auth.id ?= sharedUsers.id )"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vplmeukd",
    "name": "sharedUsers",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = " @request.auth.verified = true && (@request.auth.id = user.id || @request.auth.id ?= shared_users.id )"
  collection.viewRule = " @request.auth.verified = true && (@request.auth.id = user.id || @request.auth.id ?= shared_users.id )"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vplmeukd",
    "name": "shared_users",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})

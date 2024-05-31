/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = "  @request.auth.id = user.id"
  collection.viewRule = "  @request.auth.id = user.id"
  collection.updateRule = "  @request.auth.id = user.id"
  collection.deleteRule = "  @request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

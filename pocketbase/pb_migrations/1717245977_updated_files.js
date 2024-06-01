/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = " @request.auth.verified = true && @request.auth.id = user.id"
  collection.viewRule = " @request.auth.verified = true && @request.auth.id = user.id"
  collection.createRule = "@request.auth.verified = true && @request.auth.id != \"\""
  collection.updateRule = " @request.auth.verified = true && @request.auth.id = user.id"
  collection.deleteRule = " @request.auth.verified = true && @request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = "  @request.auth.id = user.id"
  collection.viewRule = " @request.auth.id = user.id"
  collection.createRule = "    @request.auth.id != \"\""
  collection.updateRule = "  @request.auth.id = user.id"
  collection.deleteRule = "  @request.auth.id = user.id"

  return dao.saveCollection(collection)
})

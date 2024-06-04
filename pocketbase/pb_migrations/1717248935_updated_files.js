/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = " @request.auth.verified = true && (@request.auth.id = user.id || @request.auth.id = shared_users.id )"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsy3g4z1qtbox1")

  collection.listRule = " @request.auth.verified = true && @request.auth.id = user.id"

  return dao.saveCollection(collection)
})
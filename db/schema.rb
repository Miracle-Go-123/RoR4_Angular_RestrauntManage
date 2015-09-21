# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150911224131) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "global_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "connections", ["global_id"], name: "index_connections_on_global_id", using: :btree
  add_index "connections", ["user_id"], name: "index_connections_on_user_id", using: :btree

  create_table "globals", force: :cascade do |t|
    t.string   "user_name"
    t.string   "user_picture"
    t.string   "category"
    t.string   "item_name"
    t.datetime "date_added"
    t.integer  "price"
    t.integer  "points"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.string   "category"
    t.integer  "price"
    t.string   "picture"
    t.string   "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keeps", force: :cascade do |t|
    t.string   "item_name"
    t.string   "category"
    t.integer  "price"
    t.datetime "date_saved"
    t.text     "message"
    t.string   "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.string   "picture"
    t.integer  "total_savings"
    t.string   "password_digest"
    t.string   "password_reset_token"
    t.boolean  "is_admin",             default: false
    t.string   "provider"
    t.string   "uid"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.integer  "points"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  add_foreign_key "connections", "globals"
  add_foreign_key "connections", "users"
end

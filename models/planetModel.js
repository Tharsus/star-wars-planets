import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const planetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
  terrain: {
    type: String,
    required: true,
  },
  appearances: {
    type: Number,
    required: true,
  },
});

db.model = mongoose.model('planets', planetSchema);

export { db };

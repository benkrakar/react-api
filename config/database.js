import mongoose from 'mongoose';

const db = process.env.DATABASE_LOCAL;

function databaseConnection() {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 1000,
  });
}
export default databaseConnection;
